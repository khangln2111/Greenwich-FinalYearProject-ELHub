using Application.Common.Interfaces.AppInterfaces;
using Application.DTOs.InstructorDashboardDTOs;
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
}