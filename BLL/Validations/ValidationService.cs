using BLL.Exceptions;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace BLL.Validations;

public class ValidationService(IServiceProvider serviceProvider) : IValidationService
{
    public async Task ValidateAsync<T>(T command)
    {
        var validator = serviceProvider.GetService<IValidator<T>>();
        if (validator == null) throw new InvalidOperationException($"No validator registered for {typeof(T).Name}");
        var validationResult = await validator.ValidateAsync(command);
        if (!validationResult.IsValid) throw new BadRequestException(validationResult);
    }
}