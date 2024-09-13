using BLL.DTOs.LectureDTOs;
using DAL.Constants;
using DAL.Utilities.MediaUtility.Abstract;
using FluentValidation;
using Humanizer;

namespace BLL.Validations.LectureValidators;

public class UpdateLectureCommandValidator : AbstractValidator<UpdateLectureCommand>
{
    public UpdateLectureCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.Id)
            .NotEmpty();

        RuleFor(x => x.Title)
            .MaximumLength(255)
            .When(x => !string.IsNullOrEmpty(x.Title));

        RuleFor(x => x.Description)
            .MaximumLength(255)
            .When(x => !string.IsNullOrEmpty(x.Description));

        RuleFor(x => x.Video)
            .Must(file => file == null || mediaManager.FileHasValidExtension(file, MediaConstants.VideoExtensions))
            .WithMessage(
                $"Unsupported video file extension. Supported extensions: {string.Join(", ", MediaConstants.VideoExtensions)}.")
            .Must(file => file == null || mediaManager.IsFileUnderMaxSize(file, CourseConstants.VideoMaxSizeBytes))
            .WithMessage($"Video size cannot exceed {CourseConstants.VideoMaxSizeBytes.Bytes().Humanize()}.")
            .When(x => x.Video != null);
    }
}