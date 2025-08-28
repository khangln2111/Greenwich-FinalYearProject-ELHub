using Application.DTOs.GiftDTOs;
using FluentValidation;

namespace Application.Validations.GiftValidators;

public class CreateGiftCommandValidator : AbstractValidator<CreateGiftCommand>
{
    public CreateGiftCommandValidator()
    {
        RuleFor(x => x.InventoryItemId)
            .NotEmpty()
            .WithMessage("Inventory Item ID is required.");

        RuleFor(x => x.ReceiverEmail)
            .NotEmpty()
            .EmailAddress()
            .WithMessage("A valid receiver email is required.");
    }
}