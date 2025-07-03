using BLL.DTOs.InstructorApplicationDTOs;
using DAL.Constants;
using DAL.Utilities.MediaUtility.Abstract;
using FluentValidation;
using Humanizer;

namespace BLL.Validations.InstructorApplicationValidators;

public class RetryInstructorApplicationCommandValidator : AbstractValidator<RetryInstructorApplicationCommand>
{
    public RetryInstructorApplicationCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.DisplayName)
            .MaximumLength(AppConstants.InstructorApplication.DisplayNameMaxLength)
            .When(x => !string.IsNullOrEmpty(x.DisplayName));

        RuleFor(x => x.ProfessionalTitle)
            .MaximumLength(AppConstants.InstructorApplication.ProfessionalTitleMaxLength)
            .When(x => !string.IsNullOrEmpty(x.ProfessionalTitle));

        RuleFor(x => x.About)
            .MaximumLength(AppConstants.InstructorApplication.AboutMaxLength)
            .When(x => !string.IsNullOrEmpty(x.About));

        RuleFor(x => x.WorkAvatar)
            .Must(file =>
                file == null || mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedImageExtensions))
            .WithMessage(
                $"Unsupported image file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedImageExtensions)}.")
            .Must(file => file == null || mediaManager.IsFileUnderMaxSize(file, AppConstants.User.AvatarMaxSizeBytes))
            .WithMessage($"Avatar size cannot exceed {AppConstants.User.AvatarMaxSizeBytes.Bytes().Humanize()}.")
            .When(x => x.WorkAvatar != null);
    }
}