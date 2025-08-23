using BLL.BusinessServices.Abstract;
using BLL.DTOs.AdminDashboardDTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminDashboardController(IAdminDashboardService adminDashboardService) : ControllerBase
{
    // GET: api/AdminDashboard
    [HttpGet("overview")]
    [ProducesResponseType<AdminDashboardVm>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetDashboardData()
    {
        var dashboardData = await adminDashboardService.GetDashboard();
        return Ok(dashboardData);
    }
}