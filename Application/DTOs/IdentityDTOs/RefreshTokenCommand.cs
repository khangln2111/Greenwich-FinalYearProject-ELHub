namespace Application.DTOs.IdentityDTOs;

public class RefreshTokenCommand
{
    // From the last login or refresh response used to get a new AccessTokenResponse with an extended expiration.
    public required string RefreshToken { get; init; }
}