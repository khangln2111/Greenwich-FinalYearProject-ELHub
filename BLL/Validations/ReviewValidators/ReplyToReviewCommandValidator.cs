using BLL.DTOs.ReviewDTOs;
using DAL.Constants;
using FluentValidation;

namespace BLL.Validations.ReviewValidators;

public class ReplyToReviewCommandValidator : AbstractValidator<ReplyToReviewCommand>
{
    public ReplyToReviewCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Review ID is required.");

        RuleFor(x => x.Content)
            .NotEmpty()
            .WithMessage("Reply content is required.")
            .MaximumLength(AppConstants.ReviewReply.ContentMaxLength)
            .WithMessage($"Reply content cannot exceed {AppConstants.ReviewReply.ContentMaxLength} characters.");
    }
}