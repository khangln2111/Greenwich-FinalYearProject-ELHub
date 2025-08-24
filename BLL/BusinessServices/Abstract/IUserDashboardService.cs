using BLL.DTOs.UserDashboardDTOs;

namespace BLL.BusinessServices.Abstract;

public interface IUserDashboardService
{
    Task<UserDashboardVm> GetDashboard();
}