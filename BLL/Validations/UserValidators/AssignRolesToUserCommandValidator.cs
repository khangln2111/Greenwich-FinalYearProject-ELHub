using BLL.DTOs.UserDTOs;
using FluentValidation;

namespace BLL.Validations.UserValidators;

public class AssignRolesToUserCommandValidator : AbstractValidator<AssignRolesToUserCommand>
{
    public AssignRolesToUserCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage("User ID is required.");
    }
}