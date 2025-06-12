using BLL.DTOs.ReviewDTOs;
using BLL.Gridify.CustomModels;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IReviewService
{
    Task<Paged<ReviewVm>> GetListByCourseId(Guid courseId, GridifyQuery query);

    Task<ReviewVm> GetById(Guid id);

    Task<Success> Create(CreateReviewCommand command);

    Task<Success> Update(UpdateReviewCommand command);

    Task<Success> Delete(Guid id);
}