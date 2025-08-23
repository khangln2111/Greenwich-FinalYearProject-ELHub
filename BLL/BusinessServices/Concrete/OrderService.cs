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
    IGridifyMapper<Order> gridifyMapper,
    ICurrentUserUtility currentUserUtility,
    IStripePaymentUtility stripePaymentUtility)
    : IOrderService
{
    //payment by selected cart items
    public async Task<Success> CreateOrder(CreateOrderCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var cart = await context.Carts
            .Include(x => x.CartItems)
            .ThenInclude(x => x.Course)
            .FirstOrDefaultAsync(x => x.UserId == currentUser.Id);

        if (cart == null) throw new NotFoundException("Cart not found");

        var cartItems = cart.CartItems
            .Where(x => command.CartItemIds.Contains(x.Id))
            .ToList();

        if (cartItems.Count == 0) throw new NotFoundException("Selected cart items not found");

        var totalAmount = cartItems.Sum(i => i.Course.DiscountedPrice * i.Quantity);
        var totalAmountInCents = (long)(totalAmount * 100);

        var order = new Order
        {
            UserId = currentUser.Id,
            Status = totalAmountInCents == 0 ? OrderStatus.Completed : OrderStatus.Incomplete,
            OrderItems = cartItems.Select(x => new OrderItem
            {
                CourseId = x.CourseId,
                Quantity = x.Quantity,
                DiscountedPrice = x.Course.DiscountedPrice,
                Price = x.Course.Price
            }).ToList()
        };

        await context.Orders.AddAsync(order);
        await context.SaveChangesAsync();

        var courseIds = order.OrderItems.Select(oi => oi.CourseId).ToList();

        if (order.Status == OrderStatus.Completed)
        {
            // Delete cart items for user
            var cartItemsToRemove = cartItems
                .Where(ci => courseIds.Contains(ci.CourseId))
                .ToList();
            context.CartItems.RemoveRange(cartItemsToRemove);

            // Update inventory items for user
            var inventory = await context.Inventories
                .Where(i => i.UserId == order.UserId)
                .FirstAsync();

            var inventoryItems = await context.InventoryItems
                .Where(ii => ii.InventoryId == inventory.Id && courseIds.Contains(ii.CourseId))
                .ToDictionaryAsync(ii => ii.CourseId);

            foreach (var item in order.OrderItems)
                if (inventoryItems.TryGetValue(item.CourseId, out var invItem))
                    invItem.Quantity += item.Quantity;
                else
                    await context.InventoryItems.AddAsync(new InventoryItem
                    {
                        InventoryId = inventory.Id,
                        CourseId = item.CourseId,
                        Quantity = item.Quantity
                    });

            await context.SaveChangesAsync();

            return new Success("Free order processed successfully", new
            {
                orderId = order.Id,
                isFree = true,
                status = order.Status.ToString()
            });
        }

        // Stripe payment intent
        var options = new PaymentIntentCreateOptions
        {
            Amount = totalAmountInCents,
            Currency = "usd",
            Metadata = new Dictionary<string, string>
            {
                { "orderId", order.Id.ToString() },
                { "userId", currentUser.Id.ToString() }
            },
            Description = "Thank you for your purchase",
            ReceiptEmail = currentUser.Email
        };

        var paymentIntent = await new PaymentIntentService().CreateAsync(options);

        order.PaymentIntentId = paymentIntent.Id;
        await context.SaveChangesAsync();

        return new Success("Payment intent created successfully", new
        {
            orderId = order.Id,
            clientSecret = paymentIntent.ClientSecret,
            isFree = false,
            status = order.Status.ToString()
        });
    }

    public async Task<Success> ConfirmOrder(Guid id)
    {
        var order = await context.Orders
            .Include(o => o.OrderItems).ThenInclude(orderItem => orderItem.Course)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null) throw new NotFoundException("Order not found");

        if (order.Status != OrderStatus.Incomplete)
            return new Success("Order already processed", new
            {
                orderId = order.Id,
                status = order.Status.ToString()
            });

        var intent = await stripePaymentUtility.GetPaymentIntent(order.PaymentIntentId!);
        if (intent.Status != "succeeded")
        {
            order.Status = OrderStatus.Failed;
            await context.SaveChangesAsync();

            return new Success("Payment failed", new
            {
                orderId = order.Id,
                status = order.Status.ToString()
            });
        }

        order.Status = OrderStatus.Completed;

        // Payment method info
        var paymentMethod = await new PaymentMethodService().GetAsync(intent.PaymentMethodId!);
        if (paymentMethod != null)
        {
            order.PaymentMethodType = paymentMethod.Type;
            if (paymentMethod.Card != null)
            {
                order.PaymentMethodBrand = paymentMethod.Card.Brand;
                order.PaymentMethodLast4 = paymentMethod.Card.Last4;
            }
        }

        // Clean up cart items
        var courseIds = order.OrderItems.Select(oi => oi.CourseId).ToList();
        var cartItems = await context.CartItems
            .Where(ci => ci.Cart.UserId == order.UserId && courseIds.Contains(ci.CourseId))
            .ToListAsync();

        context.CartItems.RemoveRange(cartItems);


        var inventory = await context.Inventories
            .Where(i => i.UserId == order.UserId)
            .FirstAsync();

        var inventoryItems = await context.InventoryItems
            .Where(ii => ii.InventoryId == inventory.Id && courseIds.Contains(ii.CourseId))
            .ToDictionaryAsync(ii => ii.CourseId);

        foreach (var item in order.OrderItems)
        {
            // Update inventory items for user
            if (inventoryItems.TryGetValue(item.CourseId, out var invItem))
                invItem.Quantity += item.Quantity;
            else
                await context.InventoryItems.AddAsync(new InventoryItem
                {
                    InventoryId = inventory.Id,
                    CourseId = item.CourseId,
                    Quantity = item.Quantity
                });

            // Update balance for instructor
            if (item.Course.DiscountedPrice > 0)
                await context.WalletTransactions.AddAsync(new WalletTransaction
                {
                    Id = Guid.NewGuid(),
                    UserId = item.Course.InstructorId,
                    Amount = item.DiscountedPrice * item.Quantity * 0.9m, // 10% platform fee
                    Type = WalletTransactionType.CourseSale,
                    Description = $"Course sold: {item.Course.Title} (90% revenue to instructor)"
                });
        }

        await context.SaveChangesAsync();

        return new Success("Payment succeeded", new
        {
            orderId = order.Id,
            status = order.Status.ToString()
        });
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