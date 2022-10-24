using System.Security.Claims;
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
        var user = await _userManager.FindByNameAsync(User.Identity.Name);

        var households = await _householdService.GetHouseholdsForUser(user.Id);

        return Ok(households);
    }

    [HttpPost]
    [Route("CreateApplication")]
    public async Task<IActionResult> CreateApplication([FromBody] ApplicationCreationModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = _userManager.GetUserId(User);
        var result = await _householdService.CreateApplication(model.Code, userId);

        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }

    [HttpPost]
    [Route("CreateHousehold")]
    public async Task<IActionResult> CreateHousehold([FromBody] HouseholdCreationModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        var result = await _householdService.CreateHousehold(model.Name, user.Id);

        if (result != null)
        {
            return Ok(result);
        }

        return BadRequest();
    }

   /* [HttpPost]
    [Route("UpdateProfileInHousehold")]
    public async Task<IActionResult> UpdateProfile(Profile profile, int householdId)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var household = _householdService.GetHouseholdById(householdId);
        var result = await _householdService.UpdateProfileInHousehold(householdId, profile);

        if (result != null)
        {
            return Ok();
        }

        return BadRequest();
    }
*/
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
