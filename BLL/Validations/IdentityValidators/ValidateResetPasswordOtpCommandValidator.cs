using BLL.DTOs.IdentityDTOs;
using FluentValidation;

namespace BLL.Validations.IdentityValidators;

public class ValidateResetPasswordOtpCommandValidator : AbstractValidator<ValidateResetPasswordOtpCommand>
{
    public ValidateResetPasswordOtpCommandValidator()
    {
        RuleFor(x => x.Otp)
            .NotEmpty().WithMessage("Otp is required");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Email is not valid");
    }
}