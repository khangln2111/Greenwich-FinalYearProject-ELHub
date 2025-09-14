using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;

namespace Application.Common.Contracts.InfraContracts;

public interface IExternalAuthUtility : IInfraService
{
    Task<GoogleUserInfo?> GetGoogleInfo(string code);

    Task<GoogleUserInfo?> GetGoogleInfoAuthCodeFlow(string code);
}