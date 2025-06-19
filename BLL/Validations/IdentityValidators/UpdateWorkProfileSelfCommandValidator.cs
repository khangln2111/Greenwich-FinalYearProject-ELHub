using BLL.DTOs.IdentityDTOs;
using DAL.Constants;
using DAL.Utilities.MediaUtility.Abstract;
using FluentValidation;
using Humanizer;

namespace BLL.Validations.IdentityValidators;

public class UpdateWorkProfileSelfCommandValidator : AbstractValidator<UpdateWorkProfileSelfCommand>
{
    public UpdateWorkProfileSelfCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.DisplayName)
            .MaximumLength(AppConstants.User.DisplayNameMaxLength)
            .WithMessage($"Display name must not exceed {AppConstants.User.DisplayNameMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.DisplayName));

        RuleFor(x => x.ProfessionalTitle)
            .MaximumLength(AppConstants.User.ProfessionalTitleMaxLength)
            .WithMessage(
                $"Professional title must not exceed {AppConstants.User.ProfessionalTitleMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.ProfessionalTitle));

        RuleFor(x => x.About)
            .MaximumLength(AppConstants.User.AboutMaxLength)
            .WithMessage($"About section must not exceed {AppConstants.User.AboutMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.About));

        RuleFor(x => x.FavoriteQuote)
            .MaximumLength(AppConstants.User.FavoriteQuoteMaxLength)
            .WithMessage($"Favorite quote must not exceed {AppConstants.User.FavoriteQuoteMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.FavoriteQuote));

        RuleFor(x => x.FavoriteQuoteCite)
            .MaximumLength(AppConstants.User.FavoriteQuoteCiteMaxLength)
            .WithMessage(
                $"Favorite quote cite must not exceed {AppConstants.User.FavoriteQuoteCiteMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.FavoriteQuoteCite));

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