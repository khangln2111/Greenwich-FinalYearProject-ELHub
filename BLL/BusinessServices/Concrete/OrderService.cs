using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.OrderDTOs;
using BLL.Exceptions;
using BLL.Gridify;
using BLL.Gridify.CustomModels;
using BLL.Models;
using BLL.Validations;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Data.Enums;
using DAL.Utilities.CurrentUserUtility;
using Gridify;
using Microsoft.EntityFrameworkCore;
using DAL.Utilities.PaymentUtility;
using Stripe;

namespace BLL.BusinessServices.Concrete;

public class OrderService(
    ApplicationDbContext context,
    IMapper mapper,
    IValidationService validationService,
    IGridifyMapper<Order> gridifyMapper,
    ICurrentUserUtility currentUserUtility,
    IStripePaymentUtility stripePaymentUtility)
    : IOrderService
{
    //payment by selected cart items
    public async Task<Success> CreatePaymentIntent(CreatePaymentIntentCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var currentUserId = currentUser.Id;

        var cart = await context.Carts
            .Include(x => x.CartItems)
            .ThenInclude(x => x.Course)
            .FirstOrDefaultAsync(x => x.UserId == currentUserId);

        if (cart == null) throw new NotFoundException("Cart belongs to user not found");

        var cartItems = cart.CartItems.Where(x => command.CartItemIds.Contains(x.Id)).ToList();
        if (cartItems.Count == 0) throw new NotFoundException("Cart items not found");

        var totalAmount = cartItems.Sum(i => i.Course.DiscountedPrice * i.Quantity);
        var totalAmountInCents = (long)(totalAmount * 100);

        // Create Order with status Pending
        var newOrder = new Order
        {
            UserId = currentUserId,
            Status = OrderStatus.Incomplete,
            OrderItems = cartItems.Select(x => new OrderItem
            {
                CourseId = x.CourseId,
                Quantity = x.Quantity,
                DiscountedPrice = x.Course.DiscountedPrice,
                Price = x.Course.Price
            }).ToList()
        };

        await context.Orders.AddAsync(newOrder);
        await context.SaveChangesAsync();

        var options = new PaymentIntentCreateOptions
        {
            Amount = totalAmountInCents,
            Currency = "usd",
            Metadata = new Dictionary<string, string>
            {
                { "orderId", newOrder.Id.ToString() },
                { "userId", currentUserId.ToString() }
            },
            Description = "Thank you for your purchase",
            ReceiptEmail = currentUser.Email
        };

        var service = new PaymentIntentService();
        var paymentIntent = await service.CreateAsync(options);

        // Save PaymentIntentId to Order
        newOrder.PaymentIntentId = paymentIntent.Id;
        await context.SaveChangesAsync();

        return new Success("Payment intent created successfully", new { paymentIntent.ClientSecret });
    }


    public async Task<Success> ConfirmPaymentIntent(string paymentIntentId)
    {
        var intent = await stripePaymentUtility.GetPaymentIntent(paymentIntentId);
        var metadata = intent.Metadata;

        if (!metadata.TryGetValue("orderId", out var orderIdStr) || !Guid.TryParse(orderIdStr, out var orderId))
            throw new BadRequestException("Missing or invalid orderId in metadata", ErrorCode.InvalidPaymentIntent);

        var order = await context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null)
            throw new NotFoundException("Order not found");

        // Avoid double processing
        if (order.Status != OrderStatus.Incomplete)
            return new Success("Payment already processed", new
            {
                OrderId = order.Id,
                Status = order.Status.ToString()
            });

        // Step 1: Update Order status
        order.Status = intent.Status == "succeeded"
            ? OrderStatus.Completed
            : OrderStatus.Failed;

        // Step 2: Extract payment method info
        var paymentMethodId = intent.PaymentMethodId;
        if (!string.IsNullOrEmpty(paymentMethodId))
        {
            var paymentMethodService = new PaymentMethodService();
            var paymentMethod = await paymentMethodService.GetAsync(paymentMethodId);

            if (paymentMethod.Type == "card" && paymentMethod.Card != null)
            {
                order.PaymentMethodBrand = paymentMethod.Card.Brand;
                order.PaymentMethodLast4 = paymentMethod.Card.Last4;
                order.PaymentMethodType = paymentMethod.Type;
            }
            else
            {
                order.PaymentMethodType = paymentMethod.Type;
            }
        }


        if (order.Status == OrderStatus.Completed)
        {
            // Step 3: Remove related cart items
            var courseIds = order.OrderItems.Select(oi => oi.CourseId).ToList();

            var cartItems = await context.CartItems
                .Where(ci => ci.Cart.UserId == order.UserId && courseIds.Contains(ci.CourseId))
                .ToListAsync();

            if (cartItems.Count != 0)
                context.CartItems.RemoveRange(cartItems);

            // Step 4: Ensure inventory
            var inventory = await context.Inventories
                .FirstOrDefaultAsync(i => i.UserId == order.UserId);

            // Query InventoryItems of this user and index
            var inventoryItems = await context.InventoryItems
                .Where(ii => ii.InventoryId == inventory!.Id && courseIds.Contains(ii.CourseId))
                .ToDictionaryAsync(ii => ii.CourseId);


            foreach (var orderItem in order.OrderItems)
                if (inventoryItems.TryGetValue(orderItem.CourseId, out var item))
                {
                    item.Quantity += orderItem.Quantity;
                }
                else
                {
                    var newItem = new InventoryItem
                    {
                        InventoryId = inventory!.Id,
                        CourseId = orderItem.CourseId,
                        Quantity = orderItem.Quantity
                    };
                    await context.InventoryItems.AddAsync(newItem);
                }
        }

        await context.SaveChangesAsync();

        return new Success(
            order.Status == OrderStatus.Completed ? "Payment succeeded" : "Payment failed",
            new
            {
                OrderId = order.Id,
                Status = order.Status.ToString()
            }
        );
    }

    public Task<Paged<OrderVm>> GetList(GridifyQuery query)
    {
        return context.Orders
            .AsNoTracking()
            .Include(o => o.OrderItems).ThenInclude(oi => oi.Course).ThenInclude(c => c.Image)
            .GridifyToAsync<Order, OrderVm>(query, mapper, gridifyMapper);
    }

    //get list Self 
    public Task<Paged<OrderVm>> GetListSelf(GridifyQuery query)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var currentUserId = currentUser.Id;

        return context.Orders
            .AsNoTracking()
            .Where(o => o.UserId == currentUserId)
            .Include(o => o.OrderItems).ThenInclude(oi => oi.Course).ThenInclude(c => c.Image)
            .GridifyToAsync<Order, OrderVm>(query, mapper, gridifyMapper);
    }

    public async Task<OrderDetailVm> GetByIdSelf(Guid id)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var currentUserId = currentUser.Id;

        var order = await context.Orders
            .AsNoTracking()
            .Where(o => o.Id == id && o.UserId == currentUserId)
            .Include(o => o.OrderItems).ThenInclude(oi => oi.Course).ThenInclude(c => c.Image)
            .ProjectTo<OrderDetailVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        if (order == null) throw new NotFoundException(nameof(Order), id);
        return order;
    }


    public async Task<OrderVm> GetById(Guid id)
    {
        var order = await context.Orders
            .AsNoTracking()
            .Where(o => o.Id == id)
            .Include(o => o.OrderItems).ThenInclude(oi => oi.Course)
            .ProjectTo<OrderVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        if (order == null) throw new NotFoundException(nameof(Order), id);
        return order;
    }
}