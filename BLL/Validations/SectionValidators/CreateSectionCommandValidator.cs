using BLL.DTOs.SectionDTOs;
using FluentValidation;

namespace BLL.Validations.SectionValidators;

public class CreateSectionCommandValidator : AbstractValidator<CreateSectionCommand>
{
    public CreateSectionCommandValidator()
    {
        RuleFor(x => x.CourseId).NotEmpty();
        RuleFor(x => x.Title).NotEmpty()
            .MaximumLength(50);
        RuleFor(x => x.Description).NotEmpty()
            .MaximumLength(500);
    }
}