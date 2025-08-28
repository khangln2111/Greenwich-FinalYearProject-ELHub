namespace Application.Common.Interfaces.InfrastructureInterfaces;

public interface IEmailUtility
{
    Task SendEmailAsync(string to, string subject, string body);
    Task SendConfirmationEmailAsync(string to, string code);
    Task SendForgotPasswordEmailAsync(string to, string code);

    Task SendGiftEmailAsync(string receiverEmail, string giftCode, string giverEmail,
        string? giverName = null, string? courseTitle = null);
}