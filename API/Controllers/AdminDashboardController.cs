using Application.Common.Contracts.AppContracts;
using Application.DTOs.AdminDashboardDTOs;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = nameof(RoleName.Admin))]
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