using Application.Common.Contracts.InfraContracts;
using Application.DTOs.IdentityDTOs;
using Domain.Constants;
using FluentValidation;
using Humanizer;

namespace Application.Validations.IdentityValidators;

public class UpdateWorkProfileSelfCommandValidator : AbstractValidator<UpdateWorkProfileSelfCommand>
{
    public UpdateWorkProfileSelfCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.FirstName)
            .MaximumLength(AppConstants.User.FirstNameMaxLength)
            .WithMessage($"First name must not exceed {AppConstants.User.FirstNameMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.FirstName));

        RuleFor(x => x.LastName)
            .MaximumLength(AppConstants.User.LastNameMaxLength)
            .WithMessage($"Last name must not exceed {AppConstants.User.LastNameMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.LastName));

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