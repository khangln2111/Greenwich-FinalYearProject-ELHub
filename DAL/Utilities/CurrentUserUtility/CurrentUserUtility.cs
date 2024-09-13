using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace DAL.Utilities.CurrentUserUtility;

public class CurrentUserUtility(IHttpContextAccessor httpContextAccessor) : ICurrentUserUtility
{
    public Guid GetId()
    {
        var userIdClaim = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = Guid.TryParse(userIdClaim, out var parsedUserId) ? parsedUserId : Guid.Empty;
        if (userId == Guid.Empty) throw new UnauthorizedAccessException("User is not authenticated");
        return userId;
    }

    public string GetEmail()
    {
        var emailClaim = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email);
        var email = emailClaim ?? string.Empty;
        if (string.IsNullOrEmpty(email)) throw new UnauthorizedAccessException("User is not authenticated");
        return email;
    }
}