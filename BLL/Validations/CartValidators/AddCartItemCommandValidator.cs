using BLL.DTOs.CartDTOs;
using FluentValidation;

namespace BLL.Validations.CartValidators;

public class AddCartItemCommandValidator : AbstractValidator<AddCartItemCommand>
{
    public AddCartItemCommandValidator()
    {
        RuleFor(x => x.CourseId).NotEmpty();
        RuleFor(x => x.Quantity).GreaterThan(0);
    }
}