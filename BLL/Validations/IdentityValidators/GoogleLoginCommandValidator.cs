using BLL.DTOs.IdentityDTOs;
using FluentValidation;

namespace BLL.Validations.IdentityValidators;

public class GoogleLoginCommandValidator : AbstractValidator<GoogleLoginCommand>
{
    public GoogleLoginCommandValidator()
    {
        RuleFor(x => x.IdToken).NotEmpty();
    }
}