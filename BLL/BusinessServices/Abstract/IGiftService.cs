using BLL.DTOs.GiftDTOs;
using BLL.Gridify.CustomModels;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IGiftService
{
    Task<Success> Create(CreateGiftCommand command);

    Task<Success> RedeemGift(Guid giftId);

    Task<Success> RevokeGift(Guid giftId);

    Task<Paged<SentGiftVm>> GetSentGiftsSelf(GridifyQuery query);

    Task<Paged<ReceivedGiftVm>> GetReceivedGiftsSelf(GridifyQuery query);

    Task<Success> ChangeGiftReceiver(ChangeGiftReceiverCommand command);
}