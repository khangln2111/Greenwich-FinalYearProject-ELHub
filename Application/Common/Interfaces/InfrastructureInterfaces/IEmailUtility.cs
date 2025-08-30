namespace Application.Common.Interfaces.InfrastructureInterfaces;

public interface IEmailUtility
{
    Task SendEmail(string to, string subject, string body);
    Task SendConfirmationEmail(string to, string code);
    Task SendForgotPasswordEmail(string to, string code);

    Task SendGiftEmail(string receiverEmail, string giftCode, string giverEmail,
        string? giverName = null, string? courseTitle = null);
}