using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.CartDTOs;
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
using Microsoft.AspNetCore.Http;
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
            .FirstOrDefaultAsync(x => x.ApplicationUserId == currentUserId);

        if (cart == null) throw new NotFoundException("Cart belongs to user not found");

        var cartItems = cart.CartItems.Where(x => command.CartItemIds.Contains(x.Id)).ToList();
        if (cartItems.Count == 0) throw new NotFoundException("Cart items not found");

        var totalAmount = cartItems.Sum(i => i.Course.DiscountedPrice * i.Quantity);
        var totalAmountInCents = (long)(totalAmount * 100);

        var options = new PaymentIntentCreateOptions
        {
            Amount = totalAmountInCents,
            Currency = "usd",
            Metadata = new Dictionary<string, string>
            {
                { "userId", currentUserId.ToString() },
                { "cartItemIds", string.Join(",", cartItems.Select(ci => ci.Id.ToString())) }
            },
            Description = "Thanks you for your purchase",
            ReceiptEmail = currentUser.Email
        };

        var service = new PaymentIntentService();
        var paymentIntent = await service.CreateAsync(options);

        return new Success("Payment intent created successfully", new { paymentIntent.ClientSecret });
    }


    public async Task<Success> ConfirmPaymentIntent(string paymentIntentId)
    {
        var existingOrder = await context.Orders
            .FirstOrDefaultAsync(o => o.PaymentIntentId == paymentIntentId);

        if (existingOrder != null)
            return new Success("Payment already processed", new
            {
                OrderId = existingOrder.Id,
                Status = existingOrder.Status.ToString()
            });

        var paymentIntent = await stripePaymentUtility.GetPaymentIntent(paymentIntentId);
        var metadata = paymentIntent.Metadata;

        if (!metadata.TryGetValue("userId", out var userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            throw new BadRequestException("Missing or invalid userId in metadata", ErrorCode.InvalidPaymentIntent);

        if (!metadata.TryGetValue("cartItemIds", out var cartItemIdsRaw))
            throw new BadRequestException("Missing cartItemIds in metadata", ErrorCode.InvalidPaymentIntent);

        var cartItemIds = cartItemIdsRaw
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(id => Guid.TryParse(id, out var guid) ? guid : Guid.Empty)
            .Where(id => id != Guid.Empty)
            .ToList();

        if (cartItemIds.Count == 0)
            throw new BadRequestException("Invalid cartItemIds in metadata", ErrorCode.InvalidPaymentIntent);

        // get cart items by cartItemIds and userId
        var cartItemsToRemove = await context.CartItems
            .Include(ci => ci.Course)
            .Include(ci => ci.Cart)
            .Where(ci => cartItemIds.Contains(ci.Id) && ci.Cart.ApplicationUserId == userId)
            .ToListAsync();

        var orderStatus = paymentIntent.Status == "succeeded"
            ? OrderStatus.Completed
            : OrderStatus.Failed;


        var newOrder = new Order
        {
            ApplicationUserId = userId,
            PaymentIntentId = paymentIntentId,
            Status = orderStatus,
            OrderItems = cartItemsToRemove.Select(x => new OrderItem
            {
                CourseId = x.CourseId,
                Quantity = x.Quantity,
                Price = x.Course.DiscountedPrice
            }).ToList()
        };

        await context.Orders.AddAsync(newOrder);

        if (orderStatus == OrderStatus.Completed && cartItemsToRemove.Count > 0)
            context.CartItems.RemoveRange(cartItemsToRemove);

        await context.SaveChangesAsync();

        return new Success(
            orderStatus == OrderStatus.Completed ? "Payment succeeded" : "Payment failed",
            new
            {
                OrderId = newOrder.Id,
                Status = orderStatus.ToString()
            }
        );
    }

    public Task<Paged<ListOrderVm>> GetList(GridifyQuery query)
    {
        return context.Orders
            .AsNoTracking()
            .Include(o => o.OrderItems)
            .GridifyToAsync<Order, ListOrderVm>(query, mapper, gridifyMapper);
    }

    public async Task<ListOrderVm> GetById(Guid id)
    {
        var order = await context.Orders
            .AsNoTracking()
            .Where(o => o.Id == id)
            .Include(o => o.OrderItems).ThenInclude(oi => oi.Course)
            .ProjectTo<ListOrderVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        if (order == null) throw new NotFoundException(nameof(Order), id);
        return order;
    }
}