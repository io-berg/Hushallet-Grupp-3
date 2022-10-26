using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Data.Models;
using Server.Helpers;

namespace Server.Services;

public class TaskService
{
    private readonly DatabaseContext _context;

    public TaskService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<Boolean> CreateTask(HouseholdTaskDTO task, int householdId, IdentityUser sender)
    {
        var household = await _context.Households
            .Include(h => h.Tasks)
            .Include(h => h.Profiles)
                .ThenInclude(p => p.User)
            .Where(h => h.Id == householdId)
            .FirstOrDefaultAsync();

        if (household == null)
        {
            return false;
        }

        var senderProfile = household.Profiles
            .Where(p => p.UserId == sender.Id)
            .FirstOrDefault();

        if (senderProfile.Role.ToLower() != "admin")
        {
            return false;
        }

        HouseholdTask newTask = new HouseholdTask
        {
            Title = task.Title,
            Description = task.Description,
            Effort = task.Effort,
            Frequency = task.Frequency,
            History = new List<TaskHistory>()
        };

        household.Tasks.Add(newTask);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Boolean> EditTask(HouseholdTaskDTO task, int householdId, IdentityUser sender)
    {
        var household = await _context.Households
            .Include(h => h.Tasks)
                .ThenInclude(t => t.History)
                .ThenInclude(h => h.Profile)
            .Include(h => h.Profiles)
                .ThenInclude(p => p.User)
            .Where(h => h.Id == householdId)
            .FirstOrDefaultAsync();

        if (household == null)
        {
            return false;
        }

        var senderProfile = household.Profiles
            .Where(p => p.UserId == sender.Id)
            .FirstOrDefault();

        if (senderProfile.Role.ToLower() != "admin")
        {
            return false;
        }

        var taskToUpdate = household.Tasks
            .Where(t => t.Id == task.Id)
            .FirstOrDefault();

        if (taskToUpdate == null)
        {
            return false;
        }

        taskToUpdate.Title = task.Title;
        taskToUpdate.Description = task.Description;
        taskToUpdate.Effort = task.Effort;
        taskToUpdate.Frequency = task.Frequency;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Boolean> CreateTaskHistory(TaskHistoryDTO task, int householdId, int taskId)
    {
        var household = await _context.Households
           .Include(h => h.Tasks)
           .Include(h => h.Profiles)
               .ThenInclude(p => p.User)
           .Where(h => h.Id == householdId)
           .FirstOrDefaultAsync();

        if (household == null)
        {
            return false;
        }
        var tasks = household.Tasks.Find(t => t.Id == taskId);
        var profiles = household.Profiles.Find(p => p.Id == task.ProfileId);

        TaskHistory taskHistory = new TaskHistory
        {
            Id = task.Id,
            Profile = profiles,
            Date = new DateTime { },
            ProfileId = task.ProfileId

        };

        tasks.History.Add(taskHistory);

        await _context.SaveChangesAsync();

        return true;

    }
}