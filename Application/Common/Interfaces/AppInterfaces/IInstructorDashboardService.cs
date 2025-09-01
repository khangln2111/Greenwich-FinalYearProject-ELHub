using Application.DTOs.InstructorDashboardDTOs;

namespace Application.Common.Interfaces.AppInterfaces;

public interface IInstructorDashboardService
{
    Task<InstructorDashboardVm> GetDashboard();
}