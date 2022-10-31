using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Data.Models;

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
            History = new List<TaskHistory>(),
            createdDateTask = DateTime.Now
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

    public async Task<Boolean> CreateTaskHistory(TaskHistoryDTO task, int householdId, int taskId, IdentityUser sender)
    {
        var household = await _context.Households
           .Include(h => h.Tasks)
               .ThenInclude(h => h.History)
           .Include(h => h.Profiles)
               .ThenInclude(p => p.User)
           .Where(h => h.Id == householdId)
           .FirstOrDefaultAsync();

        var senderProfile = household.Profiles
            .Where(p => p.UserId == sender.Id)
            .FirstOrDefault();

        if (household == null || senderProfile == null) return false;

        var tasks = household.Tasks.Find(t => t.Id == taskId);
        var profiles = household.Profiles.Find(p => p.Id == task.ProfileId);

        TaskHistory taskHistory = new TaskHistory
        {
            Id = task.Id,
            Profile = profiles,
            Date = DateTime.Parse(task.Date),
            ProfileId = task.ProfileId
        };

        tasks.History.Add(taskHistory);

        await _context.SaveChangesAsync();

        return true;

    }

    public async Task<Boolean> DeleteTask(HouseholdTaskDTO task, int householdId, IdentityUser sender)
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

        var taskToDelete = household.Tasks
            .Where(t => t.Id == task.Id)
            .FirstOrDefault();

        if (taskToDelete == null)
        {
            return false;
        }

        household.Tasks.Remove(taskToDelete);

        await _context.SaveChangesAsync();
        return true;
    }
}