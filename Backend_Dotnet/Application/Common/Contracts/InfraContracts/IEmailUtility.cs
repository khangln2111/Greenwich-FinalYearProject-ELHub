using Application.Common.Contracts.GeneralContracts;

namespace Application.Common.Contracts.InfraContracts;

public interface IEmailUtility : IInfraService
{
    Task SendEmail(string to, string subject, string body);
    Task SendConfirmationEmail(string to, string code);
    Task SendForgotPasswordEmail(string to, string code);

    Task SendGiftEmail(string receiverEmail, string giftCode, string giverEmail,
        string? giverName = null, string? courseTitle = null);
}