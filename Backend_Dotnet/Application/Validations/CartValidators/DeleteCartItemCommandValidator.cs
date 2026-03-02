using Application.DTOs.CartDTOs;
using FluentValidation;

namespace Application.Validations.CartValidators;

public class DeleteCartItemCommandValidator : AbstractValidator<DeleteCartItemCommand>
{
    public DeleteCartItemCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}