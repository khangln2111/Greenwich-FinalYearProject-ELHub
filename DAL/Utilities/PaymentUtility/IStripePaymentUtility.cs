using Stripe;

namespace DAL.Utilities.PaymentUtility;

public interface IStripePaymentUtility
{
    Task<PaymentIntent> CreatePaymentIntent(
        long amountInCents,
        string currency,
        Dictionary<string, string> metadata,
        string? description = null,
        string? receiptEmail = null);

    Task<PaymentIntent> GetPaymentIntent(string paymentIntentId);
}