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

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(CourseConstants.TitleMaxLength);

        RuleFor(x => x.Summary)
            .MaximumLength(CourseConstants.SummaryMaxLength);

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(CourseConstants.DescriptionMaxLength);


        RuleFor(x => x.Language)
            .MaximumLength(CourseConstants.LanguageMaxLength);

        RuleFor(x => x.Level)
            .MaximumLength(CourseConstants.LevelMaxLength);

        RuleFor(x => x.Image)
            .NotEmpty()
            .Must(file => mediaManager.FileHasValidExtension(file, MediaConstants.ImageExtensions))
            .WithMessage(
                $"Unsupported image file extension. Supported extensions: {string.Join(", ", MediaConstants.ImageExtensions)}.")
            .Must(file => mediaManager.IsFileUnderMaxSize(file, CourseConstants.ImageMaxSizeBytes))
            .WithMessage($"Image size cannot exceed {CourseConstants.ImageMaxSizeBytes.Bytes().Humanize()}.");

        RuleFor(x => x.PromoVideo)
            .NotEmpty()
            .Must(file => mediaManager.FileHasValidExtension(file, MediaConstants.VideoExtensions))
            .WithMessage(
                $"Unsupported video file extension. Supported extensions: {string.Join(", ", MediaConstants.VideoExtensions)}.")
            .Must(file => mediaManager.IsFileUnderMaxSize(file, CourseConstants.VideoMaxSizeBytes))
            .WithMessage($"PromoVideo size cannot exceed {CourseConstants.VideoMaxSizeBytes.Bytes().Humanize()}.");
    }
}