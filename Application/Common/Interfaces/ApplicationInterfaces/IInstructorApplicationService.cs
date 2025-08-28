using Application.Common.Models;
using Application.DTOs.InstructorApplicationDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Interfaces.ApplicationInterfaces;

public interface IInstructorApplicationService
{
    Task<Success> Create(CreateInstructorApplicationCommand command);
    Task<Success> Retry(RetryInstructorApplicationCommand command);
    Task<bool> CanRetrySelf();
    Task<Success> Review(ReviewInstructorApplicationCommand command);
    Task<Paged<InstructorApplicationVm>> GetList(GridifyQuery query);
    Task<InstructorApplicationVm> GetSelf();
}