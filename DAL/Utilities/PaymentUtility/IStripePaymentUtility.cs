using Stripe;

namespace DAL.Utilities.PaymentUtility;

public interface IStripePaymentUtility
{
    Task<PaymentIntent> CreatePaymentIntent(long amountInCents, string currency,
        Dictionary<string, string> metadata);

    Task<PaymentIntent> GetPaymentIntent(string paymentIntentId);
}