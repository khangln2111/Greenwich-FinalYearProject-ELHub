namespace Application.DTOs.InventoryDTOs;

public class InventoryVm
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public InventoryItemVm[] InventoryItems { get; set; } = [];
}