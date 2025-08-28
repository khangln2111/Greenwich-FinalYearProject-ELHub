using Application.DTOs.SectionDTOs;
using FluentValidation;

namespace Application.Validations.CourseValidators;

public class ReorderLectureCommandValidator : AbstractValidator<ReorderSectionCommand>
{
    public ReorderLectureCommandValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Section Id is required.");

        RuleFor(x => x.NewOrder)
            .GreaterThanOrEqualTo(0).WithMessage("New order must be a non-negative integer.");
    }
}