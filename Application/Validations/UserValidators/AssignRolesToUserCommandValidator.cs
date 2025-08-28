using Application.DTOs.UserDTOs;
using FluentValidation;

namespace Application.Validations.UserValidators;

public class AssignRolesToUserCommandValidator : AbstractValidator<AssignRolesToUserCommand>
{
    public AssignRolesToUserCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage("User ID is required.");
    }
}