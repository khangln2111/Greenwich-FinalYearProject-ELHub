using Application.DTOs.IdentityDTOs;
using FluentValidation;

namespace Application.Validations.IdentityValidators;

public class ForgotPasswordCommandValidator : AbstractValidator<SendResetPasswordOtpCommand>
{
    public ForgotPasswordCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Email is not valid");
    }
}