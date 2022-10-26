using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Data.Models;

namespace Server.Data;

public class DatabaseContextSeeding
{
    public static async Task SeedAsync(DatabaseContext context, UserManager<IdentityUser> userManager)
    {
        await context.Database.EnsureCreatedAsync();

        await SeedUsersAsync(context, userManager);
        await SeedHouseholdsAsync(context);
    }

    private static async Task SeedUsersAsync(DatabaseContext context, UserManager<IdentityUser> userManager)
    {
        if (!await context.Users.AnyAsync())
        {
            var user = new IdentityUser
            {
                UserName = "user",
                Email = "user@email.com",
                EmailConfirmed = true
            };

            await userManager.CreateAsync(user, "password");
        }
    }

    private static async Task SeedHouseholdsAsync(DatabaseContext context)
    {
        if (!await context.Households.AnyAsync())
        {
            var household = new Household
            {
                Name = "Test Household",
                Code = "123456",
                Profiles = new List<Profile>(),
                Tasks = new List<HouseholdTask>()
            };

            household.Profiles.Add(new Profile
            {
                Name = "Test Profile",
                User = await context.Users.FirstOrDefaultAsync(),
                Role = "admin",
                Avatar = new Avatar
                {
                    Icon = "🐙",
                    Color = "#ee7e86"
                }
            });

            household.Tasks.Add(new HouseholdTask
            {
                Title = "Test Task",
                Description = "Test Description",
                Effort = 1,
                Frequency = 1,
                History = new List<TaskHistory>(
                    new TaskHistory[]
                    {
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(),
                            Date = DateTime.Now,
                        }
                    }
                )
            });

            household.Applications = new List<Application>();

            context.Households.Add(household);
            await context.SaveChangesAsync();
        }
    }
}