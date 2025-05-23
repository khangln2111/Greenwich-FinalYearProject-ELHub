using AutoMapper;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.CartDTOs;
using BLL.Exceptions;
using BLL.Models;
using BLL.Validations;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Utilities.CurrentUserUtility;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class CartService(
    ApplicationDbContext context,
    IMapper mapper,
    IValidationService validationService,
    IGridifyMapper<Cart> gridifyMapper,
    ICurrentUserUtility currentUserUtility)
    : ICartService
{
    public async Task<CartVm> GetCartMe()
    {
        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null) throw new UnauthorizedException();


        var cart = await context.Carts
            .Include(x => x.CartItems)
            .ThenInclude(x => x.Course).ThenInclude(c => c.Image)
            .FirstOrDefaultAsync(x => x.ApplicationUserId == currentUser.Id);
        return mapper.Map<CartVm>(cart);
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
            .FirstOrDefaultAsync(x => x.ApplicationUserId == currentUser.Id);

        if (cart == null) throw new NotFoundException("Cart belongs to user not found");

        var cartItem = cart.CartItems.FirstOrDefault(x => x.CourseId == command.CourseId);
        if (cartItem == null)
        {
            cartItem = new CartItem
            {
                CartId = cart.Id,
                CourseId = command.CourseId,
                Quantity = command.Quantity
            };
            await context.CartItems.AddAsync(cartItem);
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