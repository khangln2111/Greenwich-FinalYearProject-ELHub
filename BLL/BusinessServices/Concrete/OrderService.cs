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
using Microsoft.AspNetCore.Http;

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
    //Create order with Stripe
    public async Task<Success> CreateOrder()
    {
        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null) throw new UnauthorizedException();

        var currentUserId = currentUser.Id;
        var cart = await context.Carts
            .Include(x => x.CartItems)
            .ThenInclude(x => x.Course)
            .FirstOrDefaultAsync(x => x.ApplicationUserId == currentUserId);

        if (cart == null) throw new NotFoundException("Cart belongs to user not found");


        var order = new Order
        {
            ApplicationUserId = currentUserId,
            Status = OrderStatus.Pending,
            OrderItems = cart.CartItems.Select(x => new OrderItem
            {
                CourseId = x.CourseId,
                Quantity = x.Quantity
            }).ToList()
        };
        await context.Orders.AddAsync(order);
        cart.CartItems.Clear();
        await context.SaveChangesAsync();

        //Handling payment with Stripe using StripePaymentUtility
        var amount = (long)order.OrderItems.Sum(x => x.Course.Price * x.Quantity * 100)!;
        var paymentIntent = await stripePaymentUtility.CreatePaymentIntent(amount, "usd", order.Id.ToString());
        return new Success("Order created successfully", new { paymentIntent.ClientSecret });
    }

    //Confirm payment for an order
    public async Task<Success> ConfirmOrder(ConfirmOrderCommand command)
    {
        var paymentIntent = await stripePaymentUtility.GetPaymentIntent(command.PaymentIntentId);
        var orderId = paymentIntent.Metadata["order_id"];
        var order = await context.Orders.FirstOrDefaultAsync(x => x.Id.ToString() == orderId);
        if (order == null) throw new NotFoundException("Order - payment intent not found");

        if (paymentIntent.Status != "succeeded")
        {
            order.Status = OrderStatus.Cancelled;
            await context.SaveChangesAsync();
            throw new HttpException(StatusCodes.Status402PaymentRequired, "Payment failed", ErrorCode.PaymentFailed);
        }

        order.Status = OrderStatus.Completed;
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