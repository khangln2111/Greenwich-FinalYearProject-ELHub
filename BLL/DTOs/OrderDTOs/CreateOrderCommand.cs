namespace BLL.DTOs.OrderDTOs;

public class CreateOrderCommand
{
    public int CartId { get; set; }
    public int AddressId { get; set; }
    public int PaymentId { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
    public string TrackingNumber { get; set; }
    public string InvoiceNumber { get; set; }
    public string InvoiceDate { get; set; }
    public string ShippedDate { get; set; }
    public string DeliveryDate { get; set; }
    public string CancelDate { get; set; }
    public string ReturnDate { get; set; }
    public string Reason { get; set; }
    public string Note { get; set; }
    public string CreatedAt { get; set; }
    public string UpdatedAt { get; set; }
    public string DeletedAt { get; set; }
}