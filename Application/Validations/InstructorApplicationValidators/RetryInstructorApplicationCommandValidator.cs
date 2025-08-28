using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.DTOs.InstructorApplicationDTOs;
using Domain.Constants;
using FluentValidation;
using Humanizer;

namespace Application.Validations.InstructorApplicationValidators;

public class RetryInstructorApplicationCommandValidator : AbstractValidator<RetryInstructorApplicationCommand>
{
    public RetryInstructorApplicationCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.FirstName)
            .MaximumLength(AppConstants.InstructorApplication.FirstNameMaxLength)
            .When(x => !string.IsNullOrEmpty(x.FirstName));

        RuleFor(x => x.LastName)
            .MaximumLength(AppConstants.InstructorApplication.LastNameMaxLength)
            .When(x => !string.IsNullOrEmpty(x.LastName));

        RuleFor(x => x.ProfessionalTitle)
            .MaximumLength(AppConstants.InstructorApplication.ProfessionalTitleMaxLength)
            .When(x => !string.IsNullOrEmpty(x.ProfessionalTitle));

        RuleFor(x => x.About)
            .MaximumLength(AppConstants.InstructorApplication.AboutMaxLength)
            .When(x => !string.IsNullOrEmpty(x.About));

        RuleFor(x => x.Avatar)
            .Must(file =>
                file == null || mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedImageExtensions))
            .WithMessage(
                $"Unsupported image file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedImageExtensions)}.")
            .Must(file => file == null || mediaManager.IsFileUnderMaxSize(file, AppConstants.User.AvatarMaxSizeBytes))
            .WithMessage($"Avatar size cannot exceed {AppConstants.User.AvatarMaxSizeBytes.Bytes().Humanize()}.")
            .When(x => x.Avatar != null);
    }
}