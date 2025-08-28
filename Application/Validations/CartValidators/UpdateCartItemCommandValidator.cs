using Application.DTOs.CartDTOs;
using FluentValidation;

namespace Application.Validations.CartValidators;

public class UpdateCartItemCommandValidator : AbstractValidator<UpdateCartItemCommand>
{
    public UpdateCartItemCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Quantity).GreaterThan(0);
    }
}