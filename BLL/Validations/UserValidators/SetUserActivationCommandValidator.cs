using BLL.DTOs.UserDTOs;
using FluentValidation;

namespace BLL.Validations.UserValidators;

public class SetUserActivationCommandValidator : AbstractValidator<SetUserActivationCommand>
{
    public SetUserActivationCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage("User ID is required.");

        RuleFor(x => x.IsActive)
            .NotNull()
            .WithMessage("Activation status must be specified.");
    }
}