using BLL.DTOs.IdentityDTOs;
using FluentValidation;

namespace BLL.Validations.IdentityValidators;

public class RefreshTokenCommandValidator : AbstractValidator<RefreshTokenCommand>
{
    public RefreshTokenCommandValidator()
    {
        RuleFor(x => x.RefreshToken)
            .NotEmpty().WithMessage("RefreshToken is required");
    }
}