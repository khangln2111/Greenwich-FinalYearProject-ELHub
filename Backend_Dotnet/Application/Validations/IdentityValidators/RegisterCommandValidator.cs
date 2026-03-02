using Application.DTOs.IdentityDTOs;
using Application.Validations.CustomValidators;
using Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;

namespace Application.Validations.IdentityValidators;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator(UserManager<ApplicationUser> userManager)
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Email is not valid");
        // .MustAsync((email, cancellation) => BeUniqueEmail(email, userManager))
        // .WithMessage("Email is already taken").WithErrorCode("409");

        RuleFor(x => x.Password)
            .SetValidator(new PasswordValidator());

        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required")
            .MinimumLength(2).WithMessage("First name must be at least 2 characters long")
            .MaximumLength(50).WithMessage("First name must not exceed 50 characters");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required")
            .MinimumLength(2).WithMessage("Last name must be at least 2 characters long")
            .MaximumLength(50).WithMessage("Last name must not exceed 50 characters");


        RuleFor(x => x.ConfirmPassword)
            .NotEmpty().WithMessage("Password confirmation is required")
            .Equal(x => x.Password).WithMessage("Passwords confirmation must match the password");
    }

    private async Task<bool> BeUniqueEmail(string email, UserManager<ApplicationUser> userManager)
    {
        var user = await userManager.FindByEmailAsync(email);
        return user == null;
    }
}