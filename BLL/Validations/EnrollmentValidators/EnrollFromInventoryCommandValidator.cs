using BLL.DTOs.EnrollmentDTOs;
using FluentValidation;

namespace BLL.Validations.EnrollmentValidators;

public class EnrollFromInventoryCommandValidator : AbstractValidator<EnrollFromInventoryCommand>
{
    public EnrollFromInventoryCommandValidator()
    {
        RuleFor(x => x.InventoryItemId)
            .NotEmpty();
    }
}