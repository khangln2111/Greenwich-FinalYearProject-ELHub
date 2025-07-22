using BLL.DTOs.UserDTOs;
using DAL.Constants;
using DAL.Utilities.MediaUtility.Abstract;
using DAL.Utilities.MediaUtility.Concrete;
using FluentValidation;
using Humanizer;

namespace BLL.Validations.UserValidators;

public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
    public UpdateUserCommandValidator(IMediaManager mediaManager)
    {
        RuleFor(x => x.FirstName)
            .MaximumLength(AppConstants.InstructorApplication.FirstNameMaxLength)
            .WithMessage(
                $"First name cannot exceed {AppConstants.InstructorApplication.FirstNameMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.FirstName));


        RuleFor(x => x.LastName)
            .MaximumLength(AppConstants.InstructorApplication.LastNameMaxLength)
            .WithMessage(
                $"Last name cannot exceed {AppConstants.InstructorApplication.LastNameMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.LastName));

        RuleFor(x => x.ProfessionalTitle)
            .MaximumLength(AppConstants.InstructorApplication.ProfessionalTitleMaxLength)
            .WithMessage(
                $"Professional title cannot exceed {AppConstants.InstructorApplication.ProfessionalTitleMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.ProfessionalTitle));

        RuleFor(x => x.DateOfBirth)
            .LessThan(DateTime.Today)
            .WithMessage("DateOfBirth must be in the past.")
            .When(x => x.DateOfBirth.HasValue);

        RuleFor(x => x.Avatar)
            .Must(file =>
                file == null || mediaManager.FileHasValidExtension(file, AppConstants.Media.AllowedImageExtensions))
            .WithMessage(
                $"Unsupported image file extension. Supported extensions: {string.Join(", ", AppConstants.Media.AllowedImageExtensions)}.")
            .Must(file => file == null || mediaManager.IsFileUnderMaxSize(file, AppConstants.User.AvatarMaxSizeBytes))
            .WithMessage($"Avatar size cannot exceed {AppConstants.User.AvatarMaxSizeBytes.Bytes().Humanize()}.")
            .When(x => x.Avatar != null);
    }
}