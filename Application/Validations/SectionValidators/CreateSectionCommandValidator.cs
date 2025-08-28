using Application.DTOs.SectionDTOs;
using Domain.Constants;
using FluentValidation;

namespace Application.Validations.SectionValidators;

public class CreateSectionCommandValidator : AbstractValidator<CreateSectionCommand>
{
    public CreateSectionCommandValidator()
    {
        RuleFor(x => x.CourseId).NotEmpty();
        RuleFor(x => x.Title).NotEmpty()
            .MaximumLength(AppConstants.Section.TitleMaxLength);
        RuleFor(x => x.Description).NotEmpty()
            .MaximumLength(AppConstants.Section.DescriptionMaxLength);
    }
}