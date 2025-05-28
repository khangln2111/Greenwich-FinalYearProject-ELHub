using DAL.Data.Enums;

namespace BLL.DTOs.OrderDTOs;

public class ListOrderVm
{
    public Guid Id { get; set; }
    public OrderStatus Status { get; set; }
    public Guid ApplicationUserId { get; set; }

    public decimal TotalAmount { get; set; }

    public decimal ProvisionalAmount { get; set; }

    public decimal TotalDirectDiscount { get; set; }

    public OrderItemVm[] OrderItems { get; set; } = [];

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}