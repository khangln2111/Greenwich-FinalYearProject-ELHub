using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.DTOs.IdentityDTOs;
using Domain.Constants;
using FluentValidation;
using Humanizer;

namespace Application.Validations.IdentityValidators;

public class UpdateUserProfileSelfCommandValidator : AbstractValidator<UpdateUserProfileSelfCommand>
{
    public UpdateUserProfileSelfCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.FirstName)
            .MaximumLength(AppConstants.User.FirstNameMaxLength)
            .WithMessage($"First name must be at most {AppConstants.User.FirstNameMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.FirstName));

        RuleFor(x => x.LastName)
            .MaximumLength(AppConstants.User.LastNameMaxLength)
            .WithMessage($"Last name must be at most {AppConstants.User.LastNameMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.LastName));

        RuleFor(x => x.Gender)
            .IsInEnum()
            .WithMessage("Invalid gender value.")
            .When(x => x.Gender.HasValue);

        RuleFor(x => x.DateOfBirth)
            .LessThan(DateTime.Today)
            .WithMessage("DateOfBirth must be in the past.")
            .When(x => x.DateOfBirth.HasValue);

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