using Application.Common.Contracts.InfraContracts;
using Application.DTOs.CategoryDTOs;
using Domain.Constants;
using FluentValidation;
using Humanizer;

namespace Application.Validations.CategoryValidators;

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