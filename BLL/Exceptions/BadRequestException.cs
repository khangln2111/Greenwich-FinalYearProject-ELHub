using System.Net;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace BLL.Exceptions;

public class BadRequestException : HttpException
{
    public IDictionary<string, string[]> ValidationErrors { get; } = new Dictionary<string, string[]>();

    public override string Message { get; } = "One or more validation errors occurred.";

    // Constructor using FluentValidation's ValidationResult to build errors.
    public BadRequestException(ValidationResult validationResult) : base(StatusCodes.Status400BadRequest,
        "One or more validation errors occurred.", ErrorCode.ValidationError)
    {
        ValidationErrors = validationResult.ToDictionary();
    }

    // Constructor using a pre-built dictionary of validation errors.
    public BadRequestException(IDictionary<string, string[]> validationErrors) : base(StatusCodes.Status400BadRequest,
        "One or more validation errors occurred.", ErrorCode.ValidationError)
    {
        ValidationErrors = validationErrors;
    }

    // Constructor using multiple IdentityError items to build errors.
    public BadRequestException(IEnumerable<IdentityError> identityErrors) : base(StatusCodes.Status400BadRequest,
        "One or more identity errors occurred.", ErrorCode.IdentityError)
    {
        foreach (var error in identityErrors)
        {
            string[] newDescriptions;

            if (ValidationErrors.TryGetValue(error.Code, out var descriptions))
            {
                newDescriptions = new string[descriptions.Length + 1];
                Array.Copy(descriptions, newDescriptions, descriptions.Length);
                newDescriptions[descriptions.Length] = error.Description;
            }
            else
            {
                newDescriptions = [error.Description];
            }

            ValidationErrors[error.Code] = newDescriptions;
        }
    }

    // Constructor using a single IdentityError.
    public BadRequestException(IdentityError identityError) : base(StatusCodes.Status400BadRequest,
        "Identity validation error", ErrorCode.IdentityError)
    {
        ValidationErrors = new Dictionary<string, string[]>
        {
            { identityError.Code, new[] { identityError.Description } }
        };
    }
}