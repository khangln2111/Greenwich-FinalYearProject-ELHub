using BLL.DTOs.CourseDTOs;
using DAL.Constants;
using FluentValidation;

namespace BLL.Validations.CourseValidators;

public class ModerateCourseCommandValidator : AbstractValidator<ModerateCourseCommand>
{
    public ModerateCourseCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage("Course ID is required.");
        RuleFor(x => x.IsApproved).NotNull().WithMessage("Approval status is required.");
        RuleFor(x => x.Note)
            .NotEmpty().WithMessage("Note is required.")
            .MaximumLength(AppConstants.Course.NoteMaxLength)
            .WithMessage($"Note must not exceed {AppConstants.Course.NoteMaxLength} characters.");
    }
}