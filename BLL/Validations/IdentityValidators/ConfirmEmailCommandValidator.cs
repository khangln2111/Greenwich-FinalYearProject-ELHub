using BLL.DTOs.IdentityDTOs;
using FluentValidation;

namespace BLL.Validations.IdentityValidators;

public class ConfirmEmailCommandValidator : AbstractValidator<ConfirmEmailCommand>
{
    public ConfirmEmailCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Email is not valid");

        RuleFor(x => x.Code)
            .NotEmpty().WithMessage("Code is required");
    }
}