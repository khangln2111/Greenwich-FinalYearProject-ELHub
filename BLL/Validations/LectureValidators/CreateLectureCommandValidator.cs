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
            .MaximumLength(AppConstants.Lecture.TitleMaxLength);

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(AppConstants.Lecture.DescriptionMaxLength);

        RuleFor(x => x.SectionId)
            .NotEmpty();

        RuleFor(x => x.IsPreview)
            .NotNull();

        RuleFor(x => x.Video)
            .NotEmpty()
            .Must(file => mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedVideoExtensions))
            .WithMessage(
                $"Unsupported video file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedVideoExtensions)}.")
            .Must(file => mediaManager.IsFileUnderMaxSize(file, AppConstants.Lecture.VideoMaxSizeBytes))
            .WithMessage($"PromoVideo size cannot exceed {AppConstants.Lecture.VideoMaxSizeBytes.Bytes().Megabytes}.");
    }
}