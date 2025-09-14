using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;

namespace Application.Common.Contracts.InfraContracts;

public interface IStripePaymentUtility : IInfraService
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