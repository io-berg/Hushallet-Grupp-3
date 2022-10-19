using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Models;
using Server.Services;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class HouseholdController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly HouseholdService _householdService;

    public HouseholdController(
        UserManager<IdentityUser> userManager,
        HouseholdService householdService)
    {
        _userManager = userManager;
        _householdService = householdService;
    }

    [HttpGet]
    [Route("MyHouseholds")]
    public async Task<IActionResult> MyHouseholds()
    {
        var userId = _userManager.GetUserId(User);
        var households = await _householdService.GetHouseholdsForUser(userId);

        return Ok(households);
    }

    [HttpPost]
    [Route("CreateApplication")]
    public async Task<IActionResult> CreateApplication([FromBody] ApplicationCreationModel model)
    {
        var userId = _userManager.GetUserId(User);
        var result = await _householdService.CreateApplication(model.Code, userId);

        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }

    [HttpGet]
    [Route("HouseholdData")]
    public async Task<IActionResult> HouseholdData([FromQuery] string id)
    {
        var household = await _householdService.GetHouseholdData(id);

        if (household != null)
        {
            return Ok(household);
        }

        return BadRequest();
    }
}
