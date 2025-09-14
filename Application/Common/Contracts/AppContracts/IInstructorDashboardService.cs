using Application.Common.Contracts.GeneralContracts;
using Application.DTOs.InstructorDashboardDTOs;

namespace Application.Common.Contracts.AppContracts;

public interface IInstructorDashboardService : IAppService
{
    Task<InstructorDashboardVm> GetDashboard();
}