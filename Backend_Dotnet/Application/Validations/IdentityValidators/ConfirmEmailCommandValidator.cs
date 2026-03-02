using Application.DTOs.IdentityDTOs;
using FluentValidation;

namespace Application.Validations.IdentityValidators;

public class ConfirmEmailCommandValidator : AbstractValidator<ConfirmEmailCommand>
{
    public ConfirmEmailCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Email is not valid");

        RuleFor(x => x.Otp)
            .NotEmpty().WithMessage("Code is required");
    }
}