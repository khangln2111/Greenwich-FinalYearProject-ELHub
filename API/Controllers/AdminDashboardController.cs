using Application.Common.Interfaces.ApplicationInterfaces;
using Application.DTOs.AdminDashboardDTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminDashboardController(IAdminDashboardService adminDashboardService) : ControllerBase
{
    // GET: api/AdminDashboard/overview
    [HttpGet("overview")]
    [ProducesResponseType<AdminDashboardVm>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetDashboardData()
    {
        var dashboardData = await adminDashboardService.GetDashboard();
        return Ok(dashboardData);
    }
}