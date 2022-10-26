using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Models;
using Server.Services;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly TaskService _taskService;

    public TaskController(
        UserManager<IdentityUser> userManager,
        TaskService taskService)
    {
        _userManager = userManager;
        _taskService = taskService;
    }

    [HttpPost]
    [Route("CreateTask")]
    public async Task<IActionResult> CreatTask(CreateTaskModel model)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        var result = await _taskService.CreateTask(model.Task, model.HouseholdId, user);

        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }

    [HttpPost]
    [Route("EditTask")]
    public async Task<IActionResult> EditTask(EditTaskModel model)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        var result = await _taskService.EditTask(model.Task, model.HouseholdId, user);

        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }
}