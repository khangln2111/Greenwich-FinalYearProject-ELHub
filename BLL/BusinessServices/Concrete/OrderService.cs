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
            AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
            {
                Enabled = true
            }
        };

        var service = new PaymentIntentService();
        var paymentIntent = await service.CreateAsync(options);

        return new Success("Payment intent created successfully", new { paymentIntent.ClientSecret });
    }

    public async Task<Success> ConfirmPaymentIntent(ConfirmPaymentIntentCommand command)
    {
        var paymentIntent = await stripePaymentUtility.GetPaymentIntent(command.PaymentIntentId);

        var metadata = paymentIntent.Metadata;
        var userId = Guid.Parse(metadata["userId"]);
        var cartItemIds = metadata["cartItemIds"].Split(',').Select(Guid.Parse).ToList();

        var cartItems = await context.CartItems
            .Where(ci => cartItemIds.Contains(ci.Id))
            .Include(ci => ci.Course)
            .ToListAsync();

        // Nếu thanh toán thất bại
        if (paymentIntent.Status != "succeeded")
        {
            var failedOrder = new Order
            {
                ApplicationUserId = userId,
                Status = OrderStatus.Failed,
                OrderItems = cartItems.Select(x => new OrderItem
                {
                    CourseId = x.CourseId,
                    Quantity = x.Quantity,
                    Price = x.Course.DiscountedPrice
                }).ToList()
            };

            await context.Orders.AddAsync(failedOrder);
            await context.SaveChangesAsync();

            throw new HttpException(StatusCodes.Status402PaymentRequired, "Payment failed", ErrorCode.PaymentFailed);
        }

        // Nếu thanh toán thành công
        foreach (var cartItem in cartItems)
            context.CartItems.Remove(cartItem);

        var order = new Order
        {
            ApplicationUserId = userId,
            Status = OrderStatus.Completed,
            OrderItems = cartItems.Select(x => new OrderItem
            {
                CourseId = x.CourseId,
                Quantity = x.Quantity,
                Price = x.Course.DiscountedPrice
            }).ToList()
        };

        await context.Orders.AddAsync(order);
        await context.SaveChangesAsync();

        return new Success("Payment succeeded");
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