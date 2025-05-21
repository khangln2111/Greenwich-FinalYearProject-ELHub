using BLL.DTOs.SectionDTOs;
using DAL.Constants;
using FluentValidation;

namespace BLL.Validations.SectionValidators;

public class CreateSectionCommandValidator : AbstractValidator<CreateSectionCommand>
{
    public CreateSectionCommandValidator()
    {
        RuleFor(x => x.CourseId).NotEmpty();
        RuleFor(x => x.Title).NotEmpty()
            .MaximumLength(SectionConstants.TitleMaxLength);
        RuleFor(x => x.Description).NotEmpty()
            .MaximumLength(SectionConstants.DescriptionMaxLength);
    }
}