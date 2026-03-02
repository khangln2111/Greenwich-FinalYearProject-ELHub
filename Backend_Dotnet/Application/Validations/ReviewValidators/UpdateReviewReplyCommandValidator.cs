using Application.DTOs.ReviewDTOs;
using Domain.Constants;
using FluentValidation;

namespace Application.Validations.ReviewValidators;

public class UpdateReviewReplyCommandValidator : AbstractValidator<UpdateReviewReplyCommand>
{
    public UpdateReviewReplyCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Review ID is required.");

        RuleFor(x => x.Content)
            .NotEmpty()
            .WithMessage("Reply content is required.")
            .MaximumLength(AppConstants.ReviewReply.ContentMaxLength)
            .WithMessage($"Reply content must not exceed {AppConstants.ReviewReply.ContentMaxLength} characters.");
    }
}