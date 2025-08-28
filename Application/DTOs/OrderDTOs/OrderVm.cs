using Domain.Enums;

namespace Application.DTOs.OrderDTOs;

public class OrderVm
{
    public Guid Id { get; set; }
    public OrderStatus Status { get; set; }
    public Guid UserId { get; set; }

    public decimal TotalAmount { get; set; }

    public decimal ProvisionalAmount { get; set; }

    public decimal TotalDirectDiscount { get; set; }

    public int ItemCount { get; set; }

    public OrderItemVm? FirstOrderItem { get; set; }

    public string? PaymentMethodType { get; set; } // e.g., "card", "bank_transfer"

    public string? PaymentMethodBrand { get; set; } // e.g., "visa", "mastercard"

    public string? PaymentMethodLast4 { get; set; } // Last 4 digits of the card number

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}