using BLL.DTOs.CartDTOs;
using FluentValidation;

namespace BLL.Validations.CartValidators;

public class DeleteCartItemCommandValidator : AbstractValidator<DeleteCartItemCommand>
{
    public DeleteCartItemCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}