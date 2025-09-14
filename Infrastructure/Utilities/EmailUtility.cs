using System.Net;
using System.Net.Mail;
using Application.Common.Contracts.InfraContracts;
using Hangfire;

namespace Infrastructure.Utilities;

public class EmailUtility : IEmailUtility
{
    private readonly string _smtpHost = "smtp.gmail.com";
    private readonly int _smtpPort = 587;
    private readonly string _smtpUsername = "legendofrain2111@gmail.com";
    private readonly string _smtpPassword = "hmwr nnzx tyjk czbh";
    private readonly SmtpClient _client;

    public EmailUtility()
    {
        _client = new SmtpClient(_smtpHost, _smtpPort)
        {
            Credentials = new NetworkCredential(_smtpUsername, _smtpPassword),
            EnableSsl = true
        };
    }

    public async Task SendEmail(string to, string subject, string body)
    {
        var message = new MailMessage(_smtpUsername, to, subject, body)
        {
            IsBodyHtml = true
        };

        await _client.SendMailAsync(message);
    }


    public Task SendGiftEmail(string receiverEmail, string giftCode, string giverEmail,
        string? giverName = null, string? courseTitle = null)
    {
        var subject = "🎁 You've Received a Gift!";

        // Optional fallback
        var senderDisplay = string.IsNullOrWhiteSpace(giverName)
            ? giverEmail
            : $"{giverName} ({giverEmail})";

        var courseDisplay = string.IsNullOrWhiteSpace(courseTitle)
            ? "a course"
            : $"the course <strong>{courseTitle}</strong>";

        var body = $@"
    <div style='font-family:Segoe UI, sans-serif; padding: 24px; background-color:#f4f6fa; border-radius:12px; color:#333;'>
        <h2 style='color:#2d6cdf;'>🎉 You've Received a Course Gift!</h2>
        
        <p style='font-size:16px; line-height:1.6;'>
            Hi there!<br/><br/>
            <strong>{senderDisplay}</strong> has gifted you {courseDisplay} on our learning platform.
        </p>

        <p style='font-size:16px;'>
            To redeem your gift, simply copy the gift code below and paste it on the gift redemption page.
        </p>

        <div style='margin: 24px 0; padding: 20px; background-color:#eaf2ff; border: 2px dashed #2d6cdf; border-radius:8px; text-align:center;'>
            <span style='font-size: 28px; letter-spacing:2px; color:#2d6cdf; font-weight: bold;'>{giftCode}</span>
        </div>

        <p style='font-size:16px;'>
            Visit our website, navigate to <em>Redeem Gift</em>, and enter the code above.
        </p>

        <p style='font-size:16px;'>
            We hope you enjoy your learning journey 🚀<br/>
            — The Team
        </p>

        <hr style='margin: 30px 0; border:none; border-top:1px solid #ddd;'/>
        <p style='font-size:12px; color:#888;'>
            If you believe you received this message by mistake, you can safely ignore it.
        </p>
    </div>";

        BackgroundJob.Enqueue(() => SendEmail(receiverEmail, subject, body));
        return Task.CompletedTask;
    }

    //SendConfirmationEmailAsync with 6 digits code
    public Task SendConfirmationEmail(string to, string code)
    {
        var subject = "Confirm your email from ELearningHub";

        //Send confirmation code with instructor to enter in the login form, making the code bold and purple
        var body = $"<p>Your confirmation code is: <strong style='color: purple'>{code}</strong></p>";
        body += "<p>Enter the code in the login form to confirm your email</p>";

        //Send email using hangfire background job
        BackgroundJob.Enqueue(() => SendEmail(to, subject, body));
        return Task.CompletedTask;
    }


    //SendPasswordResetEmailAsync with 6 digits code
    public Task SendForgotPasswordEmail(string to, string code)
    {
        var subject = "Reset your password from ELearningHub";

        //Send reset code with instructor to enter in the reset password form, making the code bold and purple
        var body = $"<p>Your reset code is: <strong style='color: purple'>{code}</strong></p>";
        body += "<p>Enter the code in the reset password form to reset your password</p>";
        body += "<p>If you didn't request a password reset, you can ignore this email</p>";

        //Send email using hangfire background job
        BackgroundJob.Enqueue(() => SendEmail(to, subject, body));
        return Task.CompletedTask;
    }
}