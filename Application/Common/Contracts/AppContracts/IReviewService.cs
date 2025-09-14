using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.ReviewDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface IReviewService : IAppService
{
    Task<Paged<ReviewVm>> GetListByCourseId(Guid courseId, GridifyQuery query);

    Task<ReviewVm> GetById(Guid id);

    Task<Success> Create(CreateReviewCommand command);

    Task<Success> Update(UpdateReviewCommand command);

    Task<Success> Delete(Guid id);

    Task<Success> ReplyToReview(ReplyToReviewCommand command);

    Task<Success> UpdateReviewReply(UpdateReviewReplyCommand command);
}