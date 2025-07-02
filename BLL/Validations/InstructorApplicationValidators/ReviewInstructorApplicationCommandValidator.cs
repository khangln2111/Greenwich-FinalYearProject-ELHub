using BLL.DTOs.InstructorApplicationDTOs;
using DAL.Constants;
using FluentValidation;

namespace BLL.Validations.InstructorApplicationValidators;

public class ReviewInstructorApplicationCommandValidator : AbstractValidator<ReviewInstructorApplicationCommand>
{
    public ReviewInstructorApplicationCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Application ID cannot be empty.");

        RuleFor(x => x.IsApproved)
            .NotNull()
            .WithMessage("Approval status must be specified.");

        RuleFor(x => x.Note)
            .NotEmpty()
            .WithMessage("Note is required.")
            .MaximumLength(AppConstants.InstructorApplication.NoteMaxLength)
            .WithMessage($"Note cannot exceed {AppConstants.InstructorApplication.NoteMaxLength} characters.");
    }
}