using Domain.Entities;
using Gridify;

namespace Application.Gridify;

public class OrderGridifyMapper : GridifyMapper<Order>
{
    public OrderGridifyMapper()
    {
        AddMap("Id", o => o.Id);
        AddMap("Status", o => o.Status);
        AddMap("TotalAmount", o => o.OrderItems.Sum(oi => oi.DiscountedPrice * oi.Quantity));
        AddMap("ProvisionalAmount", o => o.OrderItems.Sum(oi => oi.Price * oi.Quantity));
        AddMap("TotalDirectDiscount", o => o.OrderItems.Sum(oi => (oi.Price - oi.DiscountedPrice) * oi.Quantity));
        AddMap("CreatedAt", o => o.CreatedAt);
        AddMap("UpdatedAt", o => o.UpdatedAt);
    }
}