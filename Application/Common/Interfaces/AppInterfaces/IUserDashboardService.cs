using Application.DTOs.UserDashboardDTOs;

namespace Application.Common.Interfaces.AppInterfaces;

public interface IUserDashboardService
{
    Task<UserDashboardVm> GetDashboard();
}