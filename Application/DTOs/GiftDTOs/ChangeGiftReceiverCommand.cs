namespace Application.DTOs.GiftDTOs;

public class ChangeGiftReceiverCommand
{
    public required string ReceiverEmail { get; set; }

    public Guid Id { get; set; }
}