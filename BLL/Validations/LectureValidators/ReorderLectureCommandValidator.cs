using BLL.DTOs.LectureDTOs;
using FluentValidation;

namespace BLL.Validations.LectureValidators;

public class ReorderLectureCommandValidator : AbstractValidator<ReorderLectureCommand>
{
    public ReorderLectureCommandValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Lecture Id is required.");

        RuleFor(x => x.NewOrder)
            .GreaterThanOrEqualTo(0).WithMessage("New order must be a non-negative integer.");

        RuleFor(x => x.NewSectionId)
            .NotEmpty().WithMessage("New Section Id is required.");
    }
}