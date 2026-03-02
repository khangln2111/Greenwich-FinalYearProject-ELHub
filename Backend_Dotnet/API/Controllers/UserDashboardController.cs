using Application.Common.Contracts.AppContracts;
using Application.DTOs.UserDashboardDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserDashboardController(IUserDashboardService dashboardService) : ControllerBase
{
    // GET: api/UserDashboard/overview
    [HttpGet("overview")]
    [ProducesResponseType<UserDashboardVm>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetDashboardData()
    {
        var dashboardData = await dashboardService.GetDashboard();
        return Ok(dashboardData);
    }
}