using BLL.DTOs.InstructorDashboardDTOs;

namespace BLL.BusinessServices.Abstract;

public interface IInstructorDashboardService
{
    Task<InstructorDashboardVm> GetDashboard();

    Task<List<InstructorCourseSalesTrendVm>> GetSalesTrendByDateRange(DateTime startDate, DateTime endDate);
}