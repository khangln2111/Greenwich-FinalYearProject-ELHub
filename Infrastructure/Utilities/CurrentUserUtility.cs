using System.Security.Claims;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.Common.Models;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Utilities;

public class CurrentUserUtility(IHttpContextAccessor httpContextAccessor) : ICurrentUserUtility
{
    public CurrentUser? GetCurrentUser()
    {
        if (!IsAuthenticated()) return null;
        var id = GetSingleClaimValue(ClaimTypes.NameIdentifier);
        var email = GetSingleClaimValue(ClaimTypes.Email);
        var roles = GetClaimValues(ClaimTypes.Role);
        var user = new CurrentUser
        {
            Id = Guid.Parse(id),
            Email = email,
            Roles = roles
        };
        return user;
    }


    public bool IsAuthenticated()
    {
        var isAuthenticated = httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated ?? false;
        return isAuthenticated;
    }

    private List<string> GetClaimValues(string claimType)
    {
        return httpContextAccessor.HttpContext!.User.Claims
            .Where(claim => claim.Type == claimType)
            .Select(claim => claim.Value)
            .ToList();
    }

    private string GetSingleClaimValue(string claimType)
    {
        return httpContextAccessor.HttpContext!.User.Claims
            .Single(claim => claim.Type == claimType)
            .Value;
    }
}