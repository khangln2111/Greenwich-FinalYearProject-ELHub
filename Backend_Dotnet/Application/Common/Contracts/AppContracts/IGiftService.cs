using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.GiftDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface IGiftService : IAppService
{
    Task<Success> Create(CreateGiftCommand command);

    Task<Success> RedeemGift(Guid giftId);

    Task<Success> RevokeGift(Guid giftId);

    Task<Paged<SentGiftVm>> GetSentGiftsSelf(GridifyQuery query);

    Task<Paged<ReceivedGiftVm>> GetReceivedGiftsSelf(GridifyQuery query);

    Task<Success> ChangeGiftReceiver(ChangeGiftReceiverCommand command);
}