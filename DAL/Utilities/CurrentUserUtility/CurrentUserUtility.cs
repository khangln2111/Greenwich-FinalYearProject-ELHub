using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace DAL.Utilities.CurrentUserUtility;

public class CurrentUser
{
    public Guid Id { get; init; }
    public required string Email { get; init; }
    public IReadOnlyList<string> Roles { get; init; } = [];

    // No constructor needed, the properties can be initialized using object initializer
}

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