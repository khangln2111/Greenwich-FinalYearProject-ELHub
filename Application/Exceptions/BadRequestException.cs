using Domain.Enums;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Application.Exceptions;

public class BadRequestException : HttpException
{
    /// Validation errors, optional.
    public IDictionary<string, string[]> ValidationErrors { get; } = new Dictionary<string, string[]>();

    /// Metadata object, optional, can be used to pass additional info.
    public object? Metadata { get; }

    // ================= Constructors =================

    // 1. FluentValidation's ValidationResult
    public BadRequestException(ValidationResult validationResult, object? metadata = null)
        : base(StatusCodes.Status400BadRequest, "One or more validation errors occurred.", ErrorCode.ValidationError)
    {
        ValidationErrors = validationResult.ToDictionary();
        Metadata = metadata;
    }

    // 2. Pre-built dictionary of validation errors
    public BadRequestException(IDictionary<string, string[]> validationErrors, object? metadata = null)
        : base(StatusCodes.Status400BadRequest, "One or more validation errors occurred.", ErrorCode.ValidationError)
    {
        ValidationErrors = validationErrors;
        Metadata = metadata;
    }

    // 3. Multiple IdentityError items
    public BadRequestException(IEnumerable<IdentityError> identityErrors, object? metadata = null)
        : base(StatusCodes.Status400BadRequest, "One or more identity errors occurred.", ErrorCode.IdentityError)
    {
        foreach (var error in identityErrors)
            if (ValidationErrors.TryGetValue(error.Code, out var descriptions))
            {
                var newDescriptions = new string[descriptions.Length + 1];
                Array.Copy(descriptions, newDescriptions, descriptions.Length);
                newDescriptions[descriptions.Length] = error.Description;
                ValidationErrors[error.Code] = newDescriptions;
            }
            else
            {
                ValidationErrors[error.Code] = new[] { error.Description };
            }

        Metadata = metadata;
    }

    // 4. Single IdentityError
    public BadRequestException(IdentityError identityError, object? metadata = null)
        : base(StatusCodes.Status400BadRequest, "Identity validation error", ErrorCode.IdentityError)
    {
        ValidationErrors = new Dictionary<string, string[]>
        {
            { identityError.Code, new[] { identityError.Description } }
        };
        Metadata = metadata;
    }

    // 5. Custom message + errorCode + optional metadata
    public BadRequestException(string message, ErrorCode errorCode, object? metadata = null)
        : base(StatusCodes.Status400BadRequest, message, errorCode)
    {
        Metadata = metadata;
    }
}