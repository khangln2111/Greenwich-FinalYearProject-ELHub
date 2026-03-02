using Application.DTOs.CourseRecommendationDTOs;
using Domain.Constants;
using FluentValidation;

namespace Application.Validations.CourseRecommendationValidators;

public class ChatRequestValidator : AbstractValidator<ChatRequest>
{
    public ChatRequestValidator()
    {
        RuleFor(x => x.UserQuery)
            .NotEmpty().WithMessage("Query cannot be empty.")
            .MaximumLength(AppConstants.CourseRecommendation.UserQueryMaxLength)
            .WithMessage($"Query cannot exceed {AppConstants.CourseRecommendation.UserQueryMaxLength} characters.");

        RuleFor(x => x.SessionId)
            .NotEmpty().WithMessage("Session ID cannot be empty.")
            .MaximumLength(AppConstants.CourseRecommendation.ChatSessionIdMaxLength)
            .WithMessage(
                $"Session ID cannot exceed {AppConstants.CourseRecommendation.ChatSessionIdMaxLength} characters.");
    }
}