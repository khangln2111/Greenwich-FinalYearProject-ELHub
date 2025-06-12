using BLL.DTOs.ReviewDTOs;
using DAL.Constants;
using FluentValidation;

namespace BLL.Validations.ReviewValidators;

public class CreateReviewCommandValidator : AbstractValidator<CreateReviewCommand>
{
    public CreateReviewCommandValidator()
    {
        RuleFor(x => x.CourseId)
            .NotEmpty()
            .WithMessage("Course ID is required.");

        RuleFor(x => x.Rating)
            .InclusiveBetween(AppConstants.Review.MinRating, AppConstants.Review.MaxRating)
            .WithMessage("Rating must be between 1 and 5.");

        RuleFor(x => x.Content)
            .NotEmpty()
            .WithMessage("Content cannot be empty.")
            .MaximumLength(AppConstants.Review.ContentMaxLength)
            .WithMessage($"Content cannot exceed {AppConstants.Review.ContentMaxLength} characters.");
    }
}