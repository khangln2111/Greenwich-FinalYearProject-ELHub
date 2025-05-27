using BLL.DTOs.CourseDTOs;
using DAL.Constants;
using DAL.Utilities.MediaUtility.Abstract;
using FluentValidation;
using Humanizer;

namespace BLL.Validations.CourseValidators;

public class CreateCourseCommandValidator : AbstractValidator<CreateCourseCommand>
{
    public CreateCourseCommandValidator(IMediaManager mediaManager)
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .WithMessage("CategoryId cannot be empty.");

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(AppConstants.Course.TitleMaxLength);


        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(AppConstants.Course.DescriptionMaxLength);

        RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0).WithMessage("Price cannot be negative");

        RuleFor(x => x.DiscountedPrice)
            .GreaterThanOrEqualTo(0).WithMessage("DiscountedPrice cannot be negative")
            .LessThanOrEqualTo(x => x.Price).WithMessage("DiscountedPrice must be less than Price");


        RuleFor(x => x.Level)
            .IsInEnum()
            .WithMessage("Invalid course level value");


        RuleFor(x => x.Image)
            .NotEmpty()
            .Must(file => mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedImageExtensions))
            .WithMessage(
                $"Unsupported image file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedImageExtensions)}.")
            .Must(file => mediaManager.IsFileUnderMaxSize(file, AppConstants.Course.ImageMaxSizeBytes))
            .WithMessage($"Image size cannot exceed {AppConstants.Course.ImageMaxSizeBytes.Bytes().Humanize()}.");

        RuleFor(x => x.PromoVideo)
            .NotEmpty()
            .Must(file => mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedVideoExtensions))
            .WithMessage(
                $"Unsupported video file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedVideoExtensions)}.")
            .Must(file => mediaManager.IsFileUnderMaxSize(file, AppConstants.Course.VideoMaxSizeBytes))
            .WithMessage($"PromoVideo size cannot exceed {AppConstants.Course.VideoMaxSizeBytes.Bytes().Humanize()}.");
    }
}