using BLL.DTOs.LectureDTOs;
using DAL.Constants;
using DAL.Utilities.MediaUtility.Abstract;
using FluentValidation;
using Humanizer;

namespace BLL.Validations.LectureValidators;

public class CreateLectureCommandValidator : AbstractValidator<CreateLectureCommand>
{
    public CreateLectureCommandValidator(IMediaManager mediaManager)
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(255);

        RuleFor(x => x.Description)
            .NotEmpty();

        RuleFor(x => x.SectionId)
            .NotEmpty();

        RuleFor(x => x.Video)
            .NotEmpty()
            .Must(file => mediaManager.FileHasValidExtension(file, MediaConstants.VideoExtensions))
            .WithMessage(
                $"Unsupported video file extension. Supported extensions: {string.Join(", ", MediaConstants.VideoExtensions)}.")
            .Must(file => mediaManager.IsFileUnderMaxSize(file, CourseConstants.VideoMaxSizeBytes))
            .WithMessage($"PromoVideo size cannot exceed {CourseConstants.VideoMaxSizeBytes.Bytes().Megabytes}.");
    }
}