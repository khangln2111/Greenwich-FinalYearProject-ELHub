using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;

namespace BLL.Exceptions;

public class BadRequestException : Exception
{
    public IDictionary<string, string[]> ValidationErrors { get; set; } = new Dictionary<string, string[]>();

    public override string Message { get; } = "One or more validation errors occurred.";

    public BadRequestException(ValidationResult validationResult)
    {
        ValidationErrors = validationResult.ToDictionary();
    }

    public BadRequestException(IEnumerable<IdentityError> identityErrors)
    {
        // ValidationErrors = identityErrors.ToDictionary(x => x.Code, x => new[] { x.Description });

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

    public BadRequestException(IdentityError identityError)
    {
        ValidationErrors = new Dictionary<string, string[]>
        {
            { identityError.Code, new[] { identityError.Description } }
        };
    }

    public BadRequestException(string message) : base(message)
    {
        Message = message;
    }
}