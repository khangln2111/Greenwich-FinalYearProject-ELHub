using BLL.DTOs.CourseDTOs;
using DAL.Constants;
using DAL.Utilities.MediaUtility.Abstract;
using FluentValidation;
using Humanizer;

namespace BLL.Validations.CourseValidators;

public class UpdateCourseCommandValidator : AbstractValidator<UpdateCourseCommand>
{
    public UpdateCourseCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.Id)
            .NotEmpty();

        RuleFor(x => x.Title)
            .MaximumLength(AppConstants.Course.TitleMaxLength)
            .When(x => !string.IsNullOrEmpty(x.Title));

        RuleFor(x => x.Description)
            .MaximumLength(AppConstants.Course.DescriptionMaxLength)
            .When(x => !string.IsNullOrEmpty(x.Description));

        RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0).WithMessage("Price cannot be negative")
            .When(x => x.Price.HasValue);

        RuleFor(x => x.DiscountedPrice)
            .GreaterThanOrEqualTo(0).WithMessage("DiscountedPrice cannot be negative")
            .LessThanOrEqualTo(x => x.Price).WithMessage("DiscountedPrice must be less than Price")
            .When(x => x.DiscountedPrice.HasValue);

        RuleFor(x => x.LearningOutcomes)
            .Must(x => x == null || x.All(y => !string.IsNullOrEmpty(y)))
            .WithMessage("Learning outcomes cannot be null or empty")
            .When(x => x.LearningOutcomes != null);

        RuleFor(x => x.Prerequisites)
            .Must(x => x == null || x.All(y => !string.IsNullOrEmpty(y)))
            .WithMessage("Prerequisites cannot be null or empty")
            .When(x => x.Prerequisites != null);

        RuleFor(x => x.Level)
            .IsInEnum()
            .WithMessage("Invalid course level value")
            .When(x => x.Level.HasValue);

        RuleFor(x => x.Image)
            .Must(file =>
                file == null || mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedImageExtensions))
            .WithMessage(
                $"Unsupported image file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedImageExtensions)}.")
            .Must(file => file != null && mediaManager.IsFileUnderMaxSize(file, AppConstants.Course.ImageMaxSizeBytes))
            .WithMessage($"Image size cannot exceed {AppConstants.Course.ImageMaxSizeBytes.Bytes().Humanize()}.")
            .When(x => x.Image != null);

        RuleFor(x => x.PromoVideo)
            .Must(file =>
                file == null || mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedVideoExtensions))
            .WithMessage(
                $"Unsupported video file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedVideoExtensions)}.")
            .Must(file => file != null && mediaManager.IsFileUnderMaxSize(file, AppConstants.Course.VideoMaxSizeBytes))
            .WithMessage($"PromoVideo size cannot exceed {AppConstants.Course.VideoMaxSizeBytes.Bytes().Humanize()}.")
            .When(x => x.PromoVideo != null);
    }
}