using BLL.DTOs.AdminDashboardDTOs;

namespace BLL.BusinessServices.Abstract;

public interface IAdminDashboardService
{
    Task<AdminDashboardVm> GetDashboard();
}