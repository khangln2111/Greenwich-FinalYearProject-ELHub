using Application.DTOs.ReviewDTOs;
using Domain.Constants;
using FluentValidation;

namespace Application.Validations.ReviewValidators;

public class UpdateReviewCommandValidator : AbstractValidator<UpdateReviewCommand>
{
    public UpdateReviewCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Review ID is required.");

        RuleFor(x => x.Rating)
            .InclusiveBetween(AppConstants.Review.MinRating, AppConstants.Review.MaxRating)
            .WithMessage($"Rating must be between {AppConstants.Review.MinRating} and {AppConstants.Review.MaxRating}.")
            .When(x => x.Rating.HasValue);

        RuleFor(x => x.Content)
            .MaximumLength(AppConstants.Review.ContentMaxLength)
            .WithMessage($"Content cannot exceed {AppConstants.Review.ContentMaxLength} characters.")
            .When(x => !string.IsNullOrEmpty(x.Content));
    }
}