using Stripe;

namespace DAL.Utilities.PaymentUtility;

public interface IStripePaymentUtility
{
    Task<PaymentIntent> CreatePaymentIntent(long amount, string currency, string orderId);
    Task<PaymentIntent> GetPaymentIntent(string paymentIntentId);
}