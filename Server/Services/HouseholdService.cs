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

    public async Task<IEnumerable<Household>> GetHouseholdsForUser(string userId)
    {
        var households = await _context.Households
            .Where(h => h.Profiles.Where(p => p.UserId == userId).Any())
            .ToListAsync();

        return households;
    }

    public async Task<Household> GetHouseholdById(int id)
    {
        var household = await _context.Households
            .Where(h => h.Id == id)
            .Include(h => h.Profiles)
            .FirstOrDefaultAsync();

        return household;
    }

    public async Task<Household> CreateHousehold(string name)
    {
        string code = Guid.NewGuid().ToString().Substring(0, 6);

        while (await _context.Households.Where(h => h.Code == code).AnyAsync())
        {
            code = Guid.NewGuid().ToString().Substring(0, 6);
        }

        var household = new Household
        {
            Name = name,
            Code = Guid.NewGuid().ToString().Substring(0, 6),
            Profiles = new List<Profile>(),
            Tasks = new List<HouseholdTask>()
        };

        return household;
    }

    public async Task<Boolean> CreateApplication(string userId, string code)
    {
        var household = await _context.Households
            .Where(h => h.Code == code)
            .FirstOrDefaultAsync();

        if (household == null)
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