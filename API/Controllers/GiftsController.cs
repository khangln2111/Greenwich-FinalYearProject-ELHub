using BLL.BusinessServices.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GiftsController(IGiftService giftService) : ControllerBase
{
}