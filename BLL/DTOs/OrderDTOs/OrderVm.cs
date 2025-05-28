using DAL.Data.Enums;

namespace BLL.DTOs.OrderDTOs;

public class OrderVm
{
    public Guid Id { get; set; }
    public OrderStatus Status { get; set; }
    public Guid UserId { get; set; }

    public decimal TotalPrice { get; set; }

    //list of order items
    public OrderItemVm[] OrderItems { get; set; } = [];
    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}