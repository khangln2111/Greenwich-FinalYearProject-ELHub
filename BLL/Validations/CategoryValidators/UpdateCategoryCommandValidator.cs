using BLL.DTOs.CategoryDTOs;
using DAL.Constants;
using DAL.Utilities.MediaUtility.Abstract;
using FluentValidation;
using Humanizer;

namespace BLL.Validations.CategoryValidators;

public class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
{
    public UpdateCategoryCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Category Id is required.");

        RuleFor(x => x.Name)
            .MaximumLength(AppConstants.Category.NameMaxLength)
            .When(x => !string.IsNullOrEmpty(x.Name));

        RuleFor(x => x.Image)
            .Must(file =>
                file == null || mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedImageExtensions))
            .WithMessage(
                $"Unsupported image file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedImageExtensions)}.")
            .Must(file =>
                file != null && mediaManager.IsFileUnderMaxSize(file, AppConstants.Category.ImageMaxSizeBytes))
            .WithMessage($"Image size cannot exceed {AppConstants.Category.ImageMaxSizeBytes.Bytes().Humanize()}.")
            .When(x => x.Image != null);
    }
}