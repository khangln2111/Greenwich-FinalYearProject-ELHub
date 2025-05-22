using Stripe;

namespace DAL.Utilities.PaymentUtility;

public class StripePaymentUtility : IStripePaymentUtility
{
    private const string StripeSecretKey =
        "sk_test_51RRb7XRoRYlKkzyrIVCXud0eZfl4owk4bmZVkoGnvIAiaSIjwXRcLvQdIrQTpDOtR76vnqs4ZaeO0RetFJ5VrdlY00b7n17OMk";

    public StripePaymentUtility()
    {
        StripeConfiguration.ApiKey = StripeSecretKey;
    }

    public async Task<PaymentIntent> CreatePaymentIntent(long amountInCents, string currency,
        Dictionary<string, string> metadata)
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = amountInCents,
            Currency = currency,
            Metadata = metadata,
            AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
            {
                Enabled = true
            }
        };

        var service = new PaymentIntentService();
        return await service.CreateAsync(options);
    }

    public async Task<PaymentIntent> GetPaymentIntent(string paymentIntentId)
    {
        var service = new PaymentIntentService();
        return await service.GetAsync(paymentIntentId);
    }
}