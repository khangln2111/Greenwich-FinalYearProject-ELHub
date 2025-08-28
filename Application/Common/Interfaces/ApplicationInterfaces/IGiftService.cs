using Application.Common.Models;
using Application.DTOs.GiftDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Interfaces.ApplicationInterfaces;

public interface IGiftService
{
    Task<Success> Create(CreateGiftCommand command);

    Task<Success> RedeemGift(Guid giftId);

    Task<Success> RevokeGift(Guid giftId);

    Task<Paged<SentGiftVm>> GetSentGiftsSelf(GridifyQuery query);

    Task<Paged<ReceivedGiftVm>> GetReceivedGiftsSelf(GridifyQuery query);

    Task<Success> ChangeGiftReceiver(ChangeGiftReceiverCommand command);
}