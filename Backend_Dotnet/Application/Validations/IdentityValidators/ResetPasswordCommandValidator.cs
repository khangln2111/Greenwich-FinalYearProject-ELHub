using Application.DTOs.IdentityDTOs;
using Application.Validations.CustomValidators;
using FluentValidation;

namespace Application.Validations.IdentityValidators;

public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Email is not valid");

        RuleFor(x => x.Otp)
            .NotEmpty().WithMessage("Code is required");

        RuleFor(x => x.NewPassword)
            .SetValidator(new PasswordValidator());
    }
}