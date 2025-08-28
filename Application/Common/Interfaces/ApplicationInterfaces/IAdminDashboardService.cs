using Application.DTOs.AdminDashboardDTOs;

namespace Application.Common.Interfaces.ApplicationInterfaces;

public interface IAdminDashboardService
{
    Task<AdminDashboardVm> GetDashboard();
}