using BLL.DTOs.CategoryDTOs;
using DAL.Constants;
using DAL.Utilities.MediaUtility.Abstract;
using FluentValidation;
using Humanizer;

namespace BLL.Validations.CategoryValidators;

public class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(AppConstants.Category.NameMaxLength);

        RuleFor(x => x.Image)
            .NotEmpty()
            .Must(file => mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedImageExtensions))
            .WithMessage(
                $"Unsupported image file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedImageExtensions)}.")
            .Must(file => mediaManager.IsFileUnderMaxSize(file, AppConstants.Category.ImageMaxSizeBytes))
            .WithMessage($"Image size cannot exceed {AppConstants.Category.ImageMaxSizeBytes.Bytes().Humanize()}.");
    }
}