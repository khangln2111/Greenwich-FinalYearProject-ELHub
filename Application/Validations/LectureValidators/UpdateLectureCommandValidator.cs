using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.DTOs.LectureDTOs;
using Domain.Constants;
using FluentValidation;
using Humanizer;

namespace Application.Validations.LectureValidators;

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
            .Must(file =>
                file == null || mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedVideoExtensions))
            .WithMessage(
                $"Unsupported video file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedVideoExtensions)}.")
            .Must(file => file == null || mediaManager.IsFileUnderMaxSize(file, AppConstants.Lecture.VideoMaxSizeBytes))
            .WithMessage($"Video size cannot exceed {AppConstants.Lecture.VideoMaxSizeBytes.Bytes().Humanize()}.")
            .When(x => x.Video != null);
    }
}