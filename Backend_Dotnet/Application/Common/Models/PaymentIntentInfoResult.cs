namespace Application.Common.Models;

public class PaymentIntentInfoResult
{
    public required string Status { get; set; }
    public string? PaymentMethodType { get; set; }
    public string? PaymentMethodBrand { get; set; }
    public string? PaymentMethodLast4 { get; set; }
}