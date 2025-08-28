using Application.DTOs.InstructorDashboardDTOs;

namespace Application.Common.Interfaces.ApplicationInterfaces;

public interface IInstructorDashboardService
{
    Task<InstructorDashboardVm> GetDashboard();
}