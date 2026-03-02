using Application.DTOs.EnrollmentDTOs;
using FluentValidation;

namespace Application.Validations.EnrollmentValidators;

public class EnrollFromInventoryCommandValidator : AbstractValidator<EnrollFromInventoryCommand>
{
    public EnrollFromInventoryCommandValidator()
    {
        RuleFor(x => x.InventoryItemId)
            .NotEmpty();
    }
}