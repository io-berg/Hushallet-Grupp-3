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
    [Route("CreateTaskHistory")]
    public async Task<IActionResult> CreatTaskHistory(CreateTaskHistoryModel model)

    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        var result = await _taskService.CreateTaskHistory(model.Task, model.HouseholdId, model.TaskId, user);

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

    [HttpDelete]
    [Route("DeleteTask")]
    public async Task<IActionResult> DeleteTask(DeleteTaskModel model)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        var result = await _taskService.DeleteTask(model.Task, model.HouseholdId, user);

        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }
}