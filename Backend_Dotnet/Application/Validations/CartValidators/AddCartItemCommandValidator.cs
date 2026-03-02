using Application.DTOs.CartDTOs;
using FluentValidation;

namespace Application.Validations.CartValidators;

public class AddCartItemCommandValidator : AbstractValidator<AddCartItemCommand>
{
    public AddCartItemCommandValidator()
    {
        RuleFor(x => x.CourseId).NotEmpty();
        RuleFor(x => x.Quantity).GreaterThan(0);
    }
}