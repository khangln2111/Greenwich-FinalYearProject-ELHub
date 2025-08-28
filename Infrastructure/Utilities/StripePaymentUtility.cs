using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.Common.Models;
using Stripe;

namespace Infrastructure.Utilities;

public class StripePaymentUtility : IStripePaymentUtility
{
    private const string StripeSecretKey =
        "sk_test_51RRb7XRoRYlKkzyrIVCXud0eZfl4owk4bmZVkoGnvIAiaSIjwXRcLvQdIrQTpDOtR76vnqs4ZaeO0RetFJ5VrdlY00b7n17OMk";

    public StripePaymentUtility()
    {
        StripeConfiguration.ApiKey = StripeSecretKey;
    }

    public async Task<PaymentIntentResult> CreatePaymentIntent(
        long amountInCents,
        string currency,
        Dictionary<string, string>? metadata = null,
        string? description = null,
        string? receiptEmail = null
    )
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = amountInCents,
            Currency = currency,
            Metadata = metadata,
            Description = description,
            ReceiptEmail = receiptEmail
        };

        var paymentIntent = await new PaymentIntentService().CreateAsync(options);

        return new PaymentIntentResult
        {
            PaymentIntentId = paymentIntent.Id,
            ClientSecret = paymentIntent.ClientSecret!
        };
    }

    public async Task<PaymentIntentInfoResult> GetPaymentIntentInfo(string paymentIntentId)
    {
        var intent = await new PaymentIntentService().GetAsync(paymentIntentId);

        string? type = null, brand = null, last4 = null;

        if (intent.PaymentMethodId != null)
        {
            var pm = await new PaymentMethodService().GetAsync(intent.PaymentMethodId);
            type = pm.Type;
            if (pm.Card != null)
            {
                brand = pm.Card.Brand;
                last4 = pm.Card.Last4;
            }
        }

        return new PaymentIntentInfoResult
        {
            Status = intent.Status,
            PaymentMethodType = type,
            PaymentMethodBrand = brand,
            PaymentMethodLast4 = last4
        };
    }
}