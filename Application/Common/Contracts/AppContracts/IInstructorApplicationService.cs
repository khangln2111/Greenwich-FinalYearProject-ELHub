using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.InstructorApplicationDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface IInstructorApplicationService : IAppService
{
    Task<Success> Create(CreateInstructorApplicationCommand command);
    Task<Success> Resubmit(ResubmitInstructorApplicationCommand command);
    Task<bool> CanResubmitSelf();
    Task<Success> Moderate(ModerateInstructorApplicationCommand command);
    Task<Paged<InstructorApplicationVm>> GetList(GridifyQuery query);
    Task<InstructorApplicationVm> GetById(Guid id);
    Task<InstructorApplicationVm> GetSelf();
}