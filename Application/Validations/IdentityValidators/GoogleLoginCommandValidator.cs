using Application.DTOs.IdentityDTOs;
using FluentValidation;

namespace Application.Validations.IdentityValidators;

public class GoogleLoginCommandValidator : AbstractValidator<GoogleLoginCommand>
{
    public GoogleLoginCommandValidator()
    {
        RuleFor(x => x.IdToken).NotEmpty();
    }
}