using DAL.Data.Enums;

namespace BLL.DTOs.OrderDTOs;

public class OrderDetailVm
{
    public Guid Id { get; set; }
    public OrderStatus Status { get; set; }
    public Guid UserId { get; set; }

    public decimal TotalAmount { get; set; }

    public decimal ProvisionalAmount { get; set; }

    public decimal TotalDirectDiscount { get; set; }

    public string? PaymentMethodType { get; set; } // e.g., "card", "bank_transfer"

    public string? PaymentMethodBrand { get; set; } // e.g., "visa", "mastercard"

    public string? PaymentMethodLast4 { get; set; } // Last 4 digits of the card number

    public OrderItemVm[] OrderItems { get; set; } = [];

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}