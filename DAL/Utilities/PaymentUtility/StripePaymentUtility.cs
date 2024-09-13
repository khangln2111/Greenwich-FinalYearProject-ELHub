using Stripe;

namespace DAL.Utilities.PaymentUtility;

public class StripePaymentUtility : IStripePaymentUtility
{
    private const string StripeSecretKey =
        "sk_test_51Pvuy2Rv7E2M7Ub6pyedepxaNaEp3yiuIulzpX5K3m90ICjUYrUYFmkxet0MNixxl4iQHg28iuszKYgzHLZFcACp00aBHyXwYg";

    public StripePaymentUtility()
    {
        StripeConfiguration.ApiKey = StripeSecretKey;
    }

    public async Task<PaymentIntent> CreatePaymentIntent(long amount, string currency, string orderId)
    {
        var paymentIntentService = new PaymentIntentService();
        var options = new PaymentIntentCreateOptions
        {
            Amount = amount,
            Currency = currency,
            PaymentMethodTypes = new List<string> { "card" },
            Metadata = new Dictionary<string, string>
            {
                { "order_id", orderId }
            }
        };
        return await paymentIntentService.CreateAsync(options);
    }

    public async Task<PaymentIntent> GetPaymentIntent(string paymentIntentId)
    {
        var paymentIntentService = new PaymentIntentService();
        return await paymentIntentService.GetAsync(paymentIntentId);
    }
}