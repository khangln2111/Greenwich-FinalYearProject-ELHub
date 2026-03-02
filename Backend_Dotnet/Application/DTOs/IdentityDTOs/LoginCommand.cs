namespace Application.DTOs.IdentityDTOs;

public class LoginCommand
{
    /// <example>khanglngcs210650@fpt.edu.vn</example>
    public required string Email { get; init; }

    /// <example>Abcd@1234</example>
    public required string Password { get; init; }

    // The optional two-factor authenticator code. This may be required for users who have enabled two-factor authentication.
    // This is not required if a TwoFactorRecoveryCode is sent.
    // public string? TwoFactorCode { get; init; }

    // An optional two-factor recovery code from the TwoFactorRecovery endpoint.
    // This is required for users who have enabled two-factor authentication but lost access to their TwoFactorCode
    // public string? TwoFactorRecoveryCode { get; init; }
}