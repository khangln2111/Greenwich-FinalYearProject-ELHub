namespace Application.Validations;

public interface IValidationService
{
    Task ValidateAsync<T>(T command);
}