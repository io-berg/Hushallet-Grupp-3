using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Data.Models;

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
                .ThenInclude(p => p.Avatar)
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
            .FirstOrDefaultAsync();

        var existingApplication = await _context.Applications
            .Where(a => a.Household == household && a.UserId == userId)
            .FirstOrDefaultAsync();

        if (household == null || existingApplication != null)
        {
            return false;
        }

        var application = new Application
        {
            UserId = userId,
            Household = household
        };

        await _context.Applications.AddAsync(application);
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
}