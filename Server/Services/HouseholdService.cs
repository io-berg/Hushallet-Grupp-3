using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Data.Models;
using Server.Helpers;

namespace Server.Services;

public class HouseholdService
{
    private readonly DatabaseContext _context;

    public HouseholdService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<HouseholdDTO>> GetHouseholdsForUser(string userId)
    {
        var households = await _context.Households
            .Include(h => h.Profiles)
            .Include(h => h.Tasks)
                .ThenInclude(t => t.History)
            .Include(h => h.Profiles)
                .ThenInclude(p => p.User)
            .Include(h => h.Profiles)
                .ThenInclude(p => p.Avatar)
            .Include(h => h.Applications)
                .ThenInclude(a => a.User)
            .Where(h => h.Profiles.Where(p => p.UserId == userId).Any())
            .ToListAsync();

        var householdsDTO = new List<HouseholdDTO>(
            households.Select(h => new HouseholdDTO
            {
                Id = h.Id,
                Name = h.Name,
                Code = h.Code,
                Profiles = h.Profiles.Select(p => new ProfileDTO
                {
                    Id = p.Id,
                    Name = p.Name,
                    Role = p.Role,
                    Avatar = new AvatarDTO
                    {
                        Icon = p.Avatar.Icon,
                        Color = p.Avatar.Color
                    },
                    User = new UserDTO
                    {
                        Username = p.User.UserName,
                        Email = p.User.Email
                    }
                }).ToList(),
                Tasks = h.Tasks.Select(t => new HouseholdTaskDTO
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Effort = t.Effort,
                    Frequency = t.Frequency,
                    History = t.History.Select(h => new TaskHistoryDTO
                    {
                        Id = h.Id,
                        Date = h.Date.ToUniversalTime().ToString(),
                        ProfileId = h.ProfileId,
                    }).ToList()
                }).ToList(),
                Applications = h.Applications.Select(a => new ApplicationDTO
                {
                    Id = a.Id,
                    Username = a.User.UserName,
                    Email = a.User.Email
                }).ToList()
            }));


        return householdsDTO;
    }

    public async Task<Household> GetHouseholdById(int id)
    {
        var household = await _context.Households
            .Where(h => h.Id == id)
            .Include(h => h.Profiles)
            .FirstOrDefaultAsync();

        return household;
    }

    public async Task<Household> CreateHousehold(string name, string userId)
    {
        var user = await _context.Users.FindAsync(userId);
        string code = Guid.NewGuid().ToString().Substring(0, 6);

        while (await _context.Households.Where(h => h.Code == code).AnyAsync())
        {
            code = Guid.NewGuid().ToString().Substring(0, 6);
        }

        var household = new Household
        {
            Name = name,
            Code = code,
            Profiles = new List<Profile>(),
            Tasks = new List<HouseholdTask>()
        };

        household.Profiles.Add(new Profile
        {
            Name = user.UserName,
            User = user,
            Role = "admin",
            Avatar = new Avatar
            {
                Icon = "whale",
                Color = "blue"
            }
        });

        _context.Households.Add(household);
        await _context.SaveChangesAsync();

        return household;
    }

    public async Task<Boolean> CreateApplication(string userId, string code)
    {
        var household = await _context.Households
            .Where(h => h.Code == code)
            .Include(h => h.Applications)
            .FirstOrDefaultAsync();

        var existingApplication = household.Applications
            .Where(a => a.UserId == userId)
            .FirstOrDefault();

        if (household == null || existingApplication != null)
        {
            return false;
        }

        var application = new Application
        {
            UserId = userId,
            Accepted = false
        };

        household.Applications.Add(application);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<Household> GetHouseholdData(string code)
    {
        var household = await _context.Households
            .Where(h => h.Code == code)
            .Include(h => h.Profiles)
            .Include(h => h.Tasks)
            .FirstOrDefaultAsync();

        return household;
    }

    public async Task<Boolean> ApplicationResponse(int applicationId, bool accepted, IdentityUser responder)
    {
        var household = await _context.Households
            .Where(h => h.Applications.Where(a => a.Id == applicationId).Any())
            .Include(h => h.Applications)
               .ThenInclude(a => a.User)
            .Include(h => h.Profiles)
                .ThenInclude(p => p.Avatar)
            .FirstOrDefaultAsync();

        var responderProfile = household.Profiles
            .Where(p => p.UserId == responder.Id)
            .FirstOrDefault();

        if (responderProfile.Role != "admin" || responderProfile.Role != "Admin")
        {
            return false;
        }

        if (household == null) return false;

        var application = household.Applications
            .Where(a => a.Id == applicationId)
            .FirstOrDefault();

        if (application == null) return false;

        if (accepted)
        {
            household.Profiles.Add(new Profile
            {
                Name = application.User.UserName,
                User = application.User,
                Role = "member",
                Avatar = ProfileHelper.MakeDefaultProfileAvatar(household.Profiles)
            });

            household.Applications.Remove(application);

            await _context.SaveChangesAsync();
        }
        else
        {
            household.Applications.Remove(application);
            await _context.SaveChangesAsync();
        }


        return true;
    }

    public async Task<Boolean> TransferAdmin(int householdId, string email, IdentityUser sender)
    {
        var household = await _context.Households
            .Where(h => h.Id == householdId)
            .Include(h => h.Profiles)
                .ThenInclude(p => p.User)
            .FirstOrDefaultAsync();

        var senderProfile = household.Profiles
            .Where(p => p.UserId == sender.Id)
            .FirstOrDefault();

        if (senderProfile.Role.ToLower() != "admin")
        {
            return false;
        }

        var newAdmin = household.Profiles
            .Where(p => p.User.Email == email)
            .FirstOrDefault();

        if (newAdmin == null) return false;

        newAdmin.Role = "admin";
        senderProfile.Role = "member";

        await _context.SaveChangesAsync();
        return true;
    }
}