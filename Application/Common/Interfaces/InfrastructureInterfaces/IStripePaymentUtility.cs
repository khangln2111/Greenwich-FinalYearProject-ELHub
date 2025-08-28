using Application.Common.Models;

namespace Application.Common.Interfaces.InfrastructureInterfaces;

public interface IStripePaymentUtility
{
    Task<PaymentIntentResult> CreatePaymentIntent(
        long amountInCents,
        string currency,
        Dictionary<string, string>? metadata = null,
        string? description = null,
        string? receiptEmail = null
    );

    Task<PaymentIntentInfoResult> GetPaymentIntentInfo(string paymentIntentId);
}