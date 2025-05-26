using BLL.DTOs.IdentityDTOs;
using DAL.Constants;
using DAL.Utilities.MediaUtility.Abstract;
using FluentValidation;
using Humanizer;

namespace BLL.Validations.IdentityValidators;

public class UpdateUserProfileCommandValidator : AbstractValidator<UpdateUserProfileCommand>
{
    public UpdateUserProfileCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.FirstName)
            .MaximumLength(50)
            .WithMessage("First name must be at most 50 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.FirstName));

        RuleFor(x => x.LastName)
            .MaximumLength(50)
            .WithMessage("Last name must be at most 50 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.LastName));

        RuleFor(x => x.Gender)
            .IsInEnum()
            .WithMessage("Invalid gender value.")
            .When(x => x.Gender.HasValue);

        RuleFor(x => x.Birthday)
            .LessThan(DateTime.Today)
            .WithMessage("Birthday must be in the past.")
            .When(x => x.Birthday.HasValue);

        RuleFor(x => x.Avatar)
            .Must(file => file == null || mediaManager.FileHasValidExtension(file, MediaConstants.ImageExtensions))
            .WithMessage(
                $"Unsupported image file extension. Supported extensions: {string.Join(", ", MediaConstants.ImageExtensions)}.")
            .Must(file => file == null || mediaManager.IsFileUnderMaxSize(file, UserConstants.AvatarMaxSizeBytes))
            .WithMessage($"Avatar size cannot exceed {UserConstants.AvatarMaxSizeBytes.Bytes().Humanize()}.")
            .When(x => x.Avatar != null);
    }
}