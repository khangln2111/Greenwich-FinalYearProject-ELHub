using BLL.DTOs.InstructorDashboardDTOs;

namespace BLL.BusinessServices.Abstract;

public interface IInstructorDashboardService
{
    Task<InstructorDashboardVm> GetDashboard();

    Task<InstructorDashboardTrendsVm>
        GetInstructorDashboardTrends(DateTime startDate, DateTime endDate);

    Task<List<InstructorDashboardRevenueSalesVm>> GetInstructorRevenueSales(
        DateTime startDate, DateTime endDate);
}