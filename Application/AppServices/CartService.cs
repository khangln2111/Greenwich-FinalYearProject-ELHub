using Application.Common.Contracts;
using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.GeneralContracts;
using Application.Common.Contracts.InfraContracts;
using Application.Common.Models;
using Application.DTOs.CartDTOs;
using Application.Exceptions;
using Application.Validations;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.AppServices;

public class CartService(
    IApplicationDbContext context,
    IMapper mapper,
    IValidationService validationService,
    ICurrentUserUtility currentUserUtility)
    : ICartService
{
    public async Task<CartVm> GetCartSelf()
    {
        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null) throw new UnauthorizedException();


        var cart = await context.Carts
            .AsNoTracking()
            .Include(x => x.CartItems)
            .ThenInclude(x => x.Course).ThenInclude(c => c.Image)
            .ProjectTo<CartVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.UserId == currentUser.Id);

        if (cart == null) throw new NotFoundException("Cart not found for the current user");

        return cart;
    }

    public async Task<Success> AddCartItem(AddCartItemCommand command)
    {
        await validationService.ValidateAsync(command);
        var course = await context.Courses.FirstOrDefaultAsync(x => x.Id == command.CourseId);
        if (course == null) throw new NotFoundException("Course not found");

        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null) throw new UnauthorizedException();

        var cart = await context.Carts
            .Include(x => x.CartItems)
            .FirstOrDefaultAsync(x => x.UserId == currentUser.Id);

        if (cart == null) throw new NotFoundException("Cart belongs to user not found");

        var cartItem = cart.CartItems.FirstOrDefault(x => x.CourseId == command.CourseId);
        if (cartItem == null)
        {
            var newCartItem = new CartItem
            {
                CartId = cart.Id,
                CourseId = command.CourseId,
                Quantity = command.Quantity
            };
            await context.CartItems.AddAsync(newCartItem);
        }
        else
        {
            cartItem.Quantity += command.Quantity;
        }

        await context.SaveChangesAsync();
        return new Success("Item added to cart successfully");
    }

    public async Task<Success> UpdateCartItem(UpdateCartItemCommand command)
    {
        await validationService.ValidateAsync(command);
        var cartItem = await context.CartItems.FirstOrDefaultAsync(x => x.Id == command.Id);
        if (cartItem == null) throw new NotFoundException("Cart item not found");

        cartItem.Quantity = command.Quantity;
        await context.SaveChangesAsync();
        return new Success("Cart item updated successfully");
    }


    public async Task<Success> DeleteCartItem(Guid cartItemId)
    {
        var cartItem = await context.CartItems.FirstOrDefaultAsync(x => x.Id == cartItemId);
        if (cartItem == null) throw new NotFoundException("Cart item not found");

        context.CartItems.Remove(cartItem);
        await context.SaveChangesAsync();
        return new Success("Cart item deleted successfully");
    }
}