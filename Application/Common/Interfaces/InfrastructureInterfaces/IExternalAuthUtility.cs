using Application.Common.Models;

namespace Application.Common.Interfaces.InfrastructureInterfaces;

public interface IExternalAuthUtility
{
    Task<GoogleUserInfo?> GetGoogleInfo(string accessToken);
}