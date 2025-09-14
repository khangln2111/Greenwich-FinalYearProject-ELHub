using Application.Common.Contracts;
using Application.Common.Contracts.GeneralContracts;

namespace Application.Validations;

public interface IValidationService : IAppService
{
    Task ValidateAsync<T>(T command);
}