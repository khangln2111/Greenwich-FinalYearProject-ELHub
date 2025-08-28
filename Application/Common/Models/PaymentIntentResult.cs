namespace Application.Common.Models;

public class PaymentIntentResult
{
    public required string PaymentIntentId { get; set; }
    public required string ClientSecret { get; set; }
}