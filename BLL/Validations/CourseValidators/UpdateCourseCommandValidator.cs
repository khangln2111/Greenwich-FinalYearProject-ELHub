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
            .MaximumLength(CourseConstants.TitleMaxLength)
            .When(x => !string.IsNullOrEmpty(x.Title));

        RuleFor(x => x.Description)
            .MaximumLength(CourseConstants.TitleMaxLength)
            .When(x => !string.IsNullOrEmpty(x.Description));

        RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0).WithMessage("Price cannot be negative")
            .When(x => x.Price.HasValue);

        RuleFor(x => x.DiscountPercentage)
            .InclusiveBetween(0, 100)
            .When(x => x.DiscountPercentage.HasValue);


        RuleFor(x => x.LearningOutcomes)
            .Must(x => x == null || x.All(y => !string.IsNullOrEmpty(y)))
            .WithMessage("Learning outcomes cannot be null or empty")
            .When(x => x.LearningOutcomes != null);

        RuleFor(x => x.Prerequisites)
            .Must(x => x == null || x.All(y => !string.IsNullOrEmpty(y)))
            .WithMessage("Prerequisites cannot be null or empty")
            .When(x => x.Prerequisites != null);


        RuleFor(x => x.Image)
            .Must(file => file == null || mediaManager.FileHasValidExtension(file, MediaConstants.ImageExtensions))
            .WithMessage(
                $"Unsupported image file extension. Supported extensions: {string.Join(", ", MediaConstants.ImageExtensions)}.")
            .Must(file => file != null && mediaManager.IsFileUnderMaxSize(file, CourseConstants.ImageMaxSizeBytes))
            .WithMessage($"Image size cannot exceed {CourseConstants.ImageMaxSizeBytes.Bytes().Humanize()}.")
            .When(x => x.Image != null);

        RuleFor(x => x.PromoVideo)
            .Must(file => file == null || mediaManager.FileHasValidExtension(file, MediaConstants.VideoExtensions))
            .WithMessage(
                $"Unsupported video file extension. Supported extensions: {string.Join(", ", MediaConstants.VideoExtensions)}.")
            .Must(file => file != null && mediaManager.IsFileUnderMaxSize(file, CourseConstants.VideoMaxSizeBytes))
            .WithMessage($"PromoVideo size cannot exceed {CourseConstants.VideoMaxSizeBytes.Bytes().Humanize()}.")
            .When(x => x.PromoVideo != null);
    }
}