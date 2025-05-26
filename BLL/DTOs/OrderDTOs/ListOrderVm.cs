using DAL.Data.Enums;

namespace BLL.DTOs.OrderDTOs;

public class ListOrderVm
{
    public Guid Id { get; set; }
    public OrderStatus Status { get; set; }
    public Guid ApplicationUserId { get; set; }

    public decimal TotalPrice { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}