using Application.DTOs.UserDashboardDTOs;

namespace Application.Common.Interfaces.ApplicationInterfaces;

public interface IUserDashboardService
{
    Task<UserDashboardVm> GetDashboard();
}