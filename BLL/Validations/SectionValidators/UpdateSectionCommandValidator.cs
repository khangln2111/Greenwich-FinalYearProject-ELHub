using BLL.DTOs.SectionDTOs;
using FluentValidation;

namespace BLL.Validations.SectionValidators;

public class UpdateSectionCommandValidator : AbstractValidator<UpdateSectionCommand>
{
    public UpdateSectionCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Id is required");

        RuleFor(x => x.Title)
            .MaximumLength(200).WithMessage("Title cannot exceed 200 characters.")
            .NotEmpty().WithMessage("Title cannot be empty.")
            .When(x => x.Title != null);

        RuleFor(x => x.Description)
            .MaximumLength(1000).WithMessage("Description cannot exceed 1000 characters.")
            .NotEmpty().WithMessage("Description cannot be empty.")
            .When(x => x.Description != null);
    }
}