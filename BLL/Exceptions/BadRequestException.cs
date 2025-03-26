using System.Net;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace BLL.Exceptions;

public class BadRequestException : HttpException
{
    public IDictionary<string, string[]> ValidationErrors { get; } = new Dictionary<string, string[]>();

    public override string Message { get; } = "One or more validation errors occurred.";

    public BadRequestException(ValidationResult validationResult) : base(StatusCodes.Status400BadRequest,
        "One or more validation errors occurred.", 0)
    {
        ValidationErrors = validationResult.ToDictionary();
    }

    public BadRequestException(string message) : base(StatusCodes.Status400BadRequest, message,
        ErrorCode.ValidationError)
    {
        Message = message;
    }

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

    public BadRequestException(IdentityError identityError) : base(StatusCodes.Status400BadRequest,
        "Identity validation error", ErrorCode.IdentityError)
    {
        ValidationErrors = new Dictionary<string, string[]>
        {
            { identityError.Code, new[] { identityError.Description } }
        };
    }
}