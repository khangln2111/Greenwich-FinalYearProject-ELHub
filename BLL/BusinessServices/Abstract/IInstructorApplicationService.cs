using BLL.DTOs.InstructorApplicationDTOs;
using BLL.Gridify.CustomModels;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IInstructorApplicationService
{
    Task<Success> Create(CreateInstructorApplicationCommand command);
    Task<Success> Retry(RetryInstructorApplicationCommand command);
    Task<bool> CanRetrySelf();
    Task<Success> Review(ReviewInstructorApplicationCommand command);
    Task<Paged<InstructorApplicationVm>> GetList(GridifyQuery query);
    Task<InstructorApplicationVm> GetSelf();
}