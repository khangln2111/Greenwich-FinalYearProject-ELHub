using System.Net;
using System.Net.Mail;
using Hangfire;

namespace DAL.Utilities.EmailUtility;

public class EmailUtility : IEmailUtility
{
    private readonly string _smtpHost = "smtp.mailersend.net";
    private readonly int _smtpPort = 587;
    private readonly string _smtpUsername = "MS_cAZaiO@trial-3z0vklodyjvg7qrx.mlsender.net";
    private readonly string _smtpPassword = "sslIoGbW5mo2L9O9";
    private readonly SmtpClient _client;

    public EmailUtility()
    {
        _client = new SmtpClient(_smtpHost, _smtpPort)
        {
            Credentials = new NetworkCredential(_smtpUsername, _smtpPassword),
            EnableSsl = true
        };
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var message = new MailMessage(_smtpUsername, to, subject, body)
        {
            IsBodyHtml = true
        };

        await _client.SendMailAsync(message);
    }

    //SendConfirmationEmailAsync with 6 digits code
    public Task SendConfirmationEmailAsync(string to, string code)
    {
        var subject = "Confirm your email from ELearningHub";

        //Send confirmation code with instructor to enter in the login form, making the code bold and purple
        var body = $"<p>Your confirmation code is: <strong style='color: purple'>{code}</strong></p>";
        body += "<p>Enter the code in the login form to confirm your email</p>";

        //Send email using hangfire background job
        BackgroundJob.Enqueue(() => SendEmailAsync(to, subject, body));
        return Task.CompletedTask;
    }


    //SendPasswordResetEmailAsync with 6 digits code
    public Task SendForgotPasswordEmailAsync(string to, string code)
    {
        var subject = "Reset your password from ELearningHub";

        //Send reset code with instructor to enter in the reset password form, making the code bold and purple
        var body = $"<p>Your reset code is: <strong style='color: purple'>{code}</strong></p>";
        body += "<p>Enter the code in the reset password form to reset your password</p>";
        body += "<p>If you didn't request a password reset, you can ignore this email</p>";

        //Send email using hangfire background job
        BackgroundJob.Enqueue(() => SendEmailAsync(to, subject, body));
        return Task.CompletedTask;
    }
}