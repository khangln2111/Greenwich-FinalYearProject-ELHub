namespace DAL.Utilities.EmailUtility;

public interface IEmailUtility
{
    Task SendEmailAsync(string to, string subject, string body);
    Task SendConfirmationEmailAsync(string to, string code);
    Task SendForgotPasswordEmailAsync(string to, string code);
}