using BLL.DTOs.InstructorApplicationDTOs;
using DAL.Constants;
using DAL.Utilities.MediaUtility.Abstract;
using FluentValidation;
using Humanizer;

namespace BLL.Validations.InstructorApplicationValidators;

public class CreateInstructorApplicationCommandValidator : AbstractValidator<CreateInstructorApplicationCommand>
{
    public CreateInstructorApplicationCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage("First name is required.")
            .MaximumLength(AppConstants.InstructorApplication.FirstNameMaxLength)
            .WithMessage(
                $"First name cannot exceed {AppConstants.InstructorApplication.FirstNameMaxLength} characters.");

        RuleFor(x => x.LastName)
            .NotEmpty()
            .WithMessage("Last name is required.")
            .MaximumLength(AppConstants.InstructorApplication.LastNameMaxLength)
            .WithMessage(
                $"Last name cannot exceed {AppConstants.InstructorApplication.LastNameMaxLength} characters.");

        RuleFor(x => x.ProfessionalTitle)
            .NotEmpty()
            .WithMessage("Professional title is required.")
            .MaximumLength(AppConstants.InstructorApplication.ProfessionalTitleMaxLength)
            .WithMessage(
                $"Professional title cannot exceed {AppConstants.InstructorApplication.ProfessionalTitleMaxLength} characters.");

        RuleFor(x => x.About)
            .NotEmpty()
            .WithMessage("About section is required.")
            .MaximumLength(AppConstants.InstructorApplication.AboutMaxLength)
            .WithMessage(
                $"About section cannot exceed {AppConstants.InstructorApplication.AboutMaxLength} characters.");

        RuleFor(x => x.Avatar)
            .NotEmpty()
            .WithMessage("Work avatar is required.")
            .Must(file => mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedImageExtensions))
            .WithMessage(
                $"Unsupported image file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedImageExtensions)}.")
            .Must(file =>
                mediaManager.IsFileUnderMaxSize(file, AppConstants.User.AvatarMaxSizeBytes))
            .WithMessage(
                $"Work avatar size cannot exceed {AppConstants.User.AvatarMaxSizeBytes.Bytes().Humanize()}.");
    }
}