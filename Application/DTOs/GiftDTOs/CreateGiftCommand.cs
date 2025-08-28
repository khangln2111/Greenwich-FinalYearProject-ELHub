namespace Application.DTOs.GiftDTOs;

public class CreateGiftCommand
{
    public required string ReceiverEmail { get; set; }

    public required Guid InventoryItemId { get; set; }
}