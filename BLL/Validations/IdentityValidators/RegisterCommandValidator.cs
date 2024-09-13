using BLL.DTOs.IdentityDTOs;
using BLL.Validations.CustomValidators;
using DAL.Data.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;

namespace BLL.Validations.IdentityValidators;

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