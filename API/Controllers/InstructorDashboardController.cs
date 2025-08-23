using BLL.BusinessServices.Abstract;
using BLL.DTOs.InstructorDashboardDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InstructorDashboardController(IInstructorDashboardService dashboardService) : ControllerBase
{
    [HttpGet("overview")]
    public async Task<ActionResult<InstructorDashboardVm>> GetOverviewDashboard()
    {
        var dashboard = await dashboardService.GetDashboard();
        return Ok(dashboard);
    }

    [HttpGet("trends")]
    public async Task<ActionResult<InstructorDashboardTrendsVm>> GetInstructorDashboardTrends(
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate)
    {
        var trends = await dashboardService.GetInstructorDashboardTrends(startDate, endDate);
        return Ok(trends);
    }

    [HttpGet("RevenueAndSales")]
    public async Task<ActionResult<List<InstructorDashboardRevenueSalesVm>>> GetInstructorRevenueSales(
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate)
    {
        var trends = await dashboardService.GetInstructorRevenueSales(startDate, endDate);
        return Ok(trends);
    }
}