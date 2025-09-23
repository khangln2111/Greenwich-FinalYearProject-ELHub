using Application.Common.Contracts;
using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.GeneralContracts;
using Application.Common.Contracts.InfraContracts;
using Application.Common.Models;
using Application.DTOs.GiftDTOs;
using Application.Exceptions;
using Application.Gridify;
using Application.Gridify.CustomModels;
using Application.Validations;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Events.GiftEvents;
using Gridify;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.AppServices;

public class GiftService(
    IApplicationDbContext context,
    IMapper mapper,
    IValidationService validationService,
    IGridifyMapper<Gift> gridifyMapper,
    IEmailUtility emailUtility,
    ICurrentUserUtility currentUserUtility,
    IMediator mediator) : IGiftService
{
    // create methods for gifting courses, managing gift codes, etc.
    public async Task<Success> Create(CreateGiftCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        await validationService.ValidateAsync(command);

        var inventoryItem = await context.InventoryItems
            .Include(ii => ii.Course)
            .Include(ii => ii.Inventory).ThenInclude(i => i.User)
            .FirstOrDefaultAsync(ii =>
                ii.Id == command.InventoryItemId &&
                ii.Inventory.UserId == currentUser.Id);

        if (inventoryItem == null)
            throw new NotFoundException("Inventory item not found or does not belong to the current user");

        if (inventoryItem.Quantity <= 0)
            throw new BadRequestException("No remaining quantity for this item", ErrorCode.NoInventoryLeft);

        // Normalize email
        var normalizedEmail = command.ReceiverEmail.Trim().ToLower();

        if (normalizedEmail == currentUser.Email.Trim().ToLower())
            throw new BadRequestException("You cannot gift a course to yourself",
                ErrorCode.CannotGiftToSelf);

        var receiver = await context.Users
            .FirstOrDefaultAsync(u => u.Email!.ToLower() == normalizedEmail);

        if (receiver != null)
        {
            var alreadyEnrolled = await context.Enrollments.AnyAsync(e =>
                e.UserId == receiver.Id &&
                e.CourseId == inventoryItem.CourseId);


            if (alreadyEnrolled)
                throw new BadRequestException("This user has already enrolled in the course",
                    ErrorCode.CourseAlreadyEnrolled);
        }

        var gift = new Gift
        {
            ReceiverEmail = command.ReceiverEmail.Trim(),
            InventoryItemId = command.InventoryItemId,
            GiverId = currentUser.Id
        };

        await context.Gifts.AddAsync(gift);
        inventoryItem.Quantity -= 1;

        await context.SaveChangesAsync();

        await mediator.Publish(new GiftCreatedEvent(gift));

        return new Success("Gifted the course successfully");
    }


    public async Task<Success> ChangeGiftReceiver(ChangeGiftReceiverCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        await validationService.ValidateAsync(command);

        // Get gift with necessary includes for email
        var gift = await context.Gifts
            .Include(g => g.InventoryItem)
            .ThenInclude(ii => ii.Course)
            .Include(g => g.InventoryItem)
            .ThenInclude(ii => ii.Inventory)
            .ThenInclude(inv => inv.User)
            .FirstOrDefaultAsync(g =>
                g.Id == command.Id &&
                g.GiverId == currentUser.Id);


        if (gift == null)
            throw new NotFoundException("Gift not found");

        if (gift.Status != GiftStatus.Pending)
            throw new BadRequestException("This gift has already been redeemed or revoked", ErrorCode.GiftUnavailable);

        var newReceiverEmail = command.ReceiverEmail.Trim();
        if (string.Equals(newReceiverEmail, currentUser.Email, StringComparison.OrdinalIgnoreCase))
            throw new BadRequestException(
                "You cannot send a gift to your own email.",
                ErrorCode.CannotGiftToSelf
            );


        gift.ReceiverEmail = newReceiverEmail;
        await context.SaveChangesAsync();

        // Resend gift email to new receiver
        var giftCode = gift.Id.ToString().ToUpperInvariant();
        var giverFullName =
            $"{gift.InventoryItem.Inventory.User.FirstName} {gift.InventoryItem.Inventory.User.LastName}";
        var courseTitle = gift.InventoryItem.Course.Title;

        await emailUtility.SendGiftEmail(
            gift.ReceiverEmail,
            giftCode,
            currentUser.Email,
            giverFullName,
            courseTitle
        );


        return new Success("Successfully changed the receiver email and resent the gift email");
    }


    public async Task<Success> RedeemGift(Guid giftId)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var gift = await context.Gifts
            .Include(g => g.InventoryItem)
            .ThenInclude(ii => ii.Course)
            .FirstOrDefaultAsync(g => g.Id == giftId);

        if (gift == null ||
            !string.Equals(gift.ReceiverEmail.Trim(), currentUser.Email, StringComparison.OrdinalIgnoreCase))
            throw new NotFoundException("Gift not found");

        if (gift.Status != GiftStatus.Pending)
            throw new BadRequestException("This gift has already been redeemed or revoked",
                ErrorCode.GiftUnavailable);


        var inventoryItem = gift.InventoryItem;

        // Check if user already enrolled (optional)
        var alreadyEnrolled = await context.Enrollments.AnyAsync(e =>
            e.CourseId == inventoryItem.CourseId &&
            e.UserId == currentUser.Id);

        if (alreadyEnrolled)
            throw new BadRequestException("You have already enrolled in this course", ErrorCode.CourseAlreadyEnrolled);

        // Create enrollment
        var enrollment = new Enrollment
        {
            UserId = currentUser.Id,
            CourseId = inventoryItem.CourseId
        };

        await context.Enrollments.AddAsync(enrollment);

        // Mark gift as redeemed
        gift.RedeemedAt = DateTime.Now;
        gift.Status = GiftStatus.Redeemed;

        await context.SaveChangesAsync();
        await mediator.Publish(new GiftRedeemedEvent(gift));

        return new Success("Successfully redeemed the gift");
    }

    public async Task<Success> RevokeGift(Guid giftId)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var gift = await context.Gifts
            .Include(g => g.InventoryItem)
            .ThenInclude(ii => ii.Inventory)
            .FirstOrDefaultAsync(g => g.Id == giftId && g.GiverId == currentUser.Id);

        if (gift == null)
            throw new NotFoundException("Gift not found");

        if (gift.Status != GiftStatus.Pending)
            throw new BadRequestException("This gift has already been redeemed or revoked", ErrorCode.GiftUnavailable);

        var inventoryItem = gift.InventoryItem;
        if (inventoryItem == null)
            throw new BadRequestException("The associated inventory item could not be found",
                ErrorCode.InvalidOperation);

        // Mark gift as revoked
        gift.Status = GiftStatus.Revoked;
        gift.RevokedAt = DateTime.Now;

        // Return item quantity
        inventoryItem.Quantity += 1;

        await context.SaveChangesAsync();

        return new Success("Successfully revoked the gift and returned it to your inventory");
    }


    // Get list of gifts sent by the current user
    public async Task<Paged<SentGiftVm>> GetSentGiftsSelf(GridifyQuery query)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var gifts = await context.Gifts
            .AsNoTracking()
            .Where(g => g.GiverId == currentUser.Id)
            .GridifyToAsync<Gift, SentGiftVm>(query, mapper);

        return gifts;
    }

    public async Task<Paged<ReceivedGiftVm>> GetReceivedGiftsSelf(GridifyQuery query)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var normalizedEmail = currentUser.Email.Trim().ToLower();

        var gifts = await context.Gifts
            .AsNoTracking()
            .Where(g => g.ReceiverEmail.ToLower() == normalizedEmail)
            .GridifyToAsync<Gift, ReceivedGiftVm>(query, mapper);

        return gifts;
    }
}