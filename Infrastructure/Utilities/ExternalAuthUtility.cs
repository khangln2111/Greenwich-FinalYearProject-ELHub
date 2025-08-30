using System.Net.Http.Headers;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.Common.Models;
using Newtonsoft.Json;

namespace Infrastructure.Utilities;

public class ExternalAuthUtility(HttpClient httpClient) : IExternalAuthUtility
{
    public async Task<GoogleUserInfo?> GetGoogleInfo(string accessToken)
    {
        var request = new HttpRequestMessage(HttpMethod.Get, "https://www.googleapis.com/oauth2/v2/userinfo");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var response = await httpClient.SendAsync(request);
        if (!response.IsSuccessStatusCode)
            return null;

        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<GoogleUserInfo>(json);
    }
}