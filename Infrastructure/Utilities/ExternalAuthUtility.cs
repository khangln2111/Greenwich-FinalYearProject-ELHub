using System.Net.Http.Headers;
using System.Net.Http.Json;
using Application.Common.Contracts.InfraContracts;
using Application.Common.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Infrastructure.Utilities;

public class ExternalAuthUtility(HttpClient httpClient, IConfiguration config) : IExternalAuthUtility
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

    public async Task<GoogleUserInfo?> GetGoogleInfoAuthCodeFlow(string code)
    {
        var tokenRequest = new Dictionary<string, string?>
        {
            ["code"] = code,
            ["client_id"] = config["GoogleOAuthSettings:ClientId"],
            ["client_secret"] = config["GoogleOAuthSettings:ClientSecret"],
            ["redirect_uri"] = config["GoogleOAuthSettings:RedirectUri"],
            ["grant_type"] = "authorization_code"
        };

        var tokenResponse = await httpClient.PostAsync(
            "https://oauth2.googleapis.com/token",
            new FormUrlEncodedContent(tokenRequest)
        );

        if (!tokenResponse.IsSuccessStatusCode)
            return null;

        var tokenJson = await tokenResponse.Content.ReadFromJsonAsync<Dictionary<string, object>>();
        if (tokenJson == null || !tokenJson.TryGetValue("access_token", out var accessTokenObj))
            return null;

        var accessToken = accessTokenObj.ToString();

        var request = new HttpRequestMessage(HttpMethod.Get, "https://www.googleapis.com/oauth2/v2/userinfo");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var response = await httpClient.SendAsync(request);
        if (!response.IsSuccessStatusCode)
            return null;

        var json = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<GoogleUserInfo>(json);
    }
}