namespace BLL.Validations;

public interface IValidationService
{
    Task ValidateAsync<T>(T command);
}