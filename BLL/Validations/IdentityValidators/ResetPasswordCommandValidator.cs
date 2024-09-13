using BLL.DTOs.IdentityDTOs;
using BLL.Validations.CustomValidators;
using FluentValidation;

namespace BLL.Validations.IdentityValidators;

public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Email is not valid");

        RuleFor(x => x.Code)
            .NotEmpty().WithMessage("Code is required");

        RuleFor(x => x.NewPassword)
            .SetValidator(new PasswordValidator());
    }
}