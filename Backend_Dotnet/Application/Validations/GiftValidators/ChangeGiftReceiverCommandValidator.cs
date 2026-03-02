using Application.DTOs.GiftDTOs;
using FluentValidation;

namespace Application.Validations.GiftValidators;

public class ChangeGiftReceiverCommandValidator : AbstractValidator<ChangeGiftReceiverCommand>
{
    public ChangeGiftReceiverCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Gift ID is required.");

        RuleFor(x => x.ReceiverEmail)
            .NotEmpty()
            .EmailAddress()
            .WithMessage("A valid receiver email is required.");
    }
}