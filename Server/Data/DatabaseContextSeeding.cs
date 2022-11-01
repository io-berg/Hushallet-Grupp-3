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

            var user2 = new IdentityUser
            {
                UserName = "user2",
                Email = "user2@email.com",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(user2, "password");

            var user3 = new IdentityUser
            {
                UserName = "user3",
                Email = "user3@mail.com",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(user3, "password");

            var user4 = new IdentityUser
            {
                UserName = "user4",
                Email = "user4@mail.com",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(user4, "password");

            var user5 = new IdentityUser
            {
                UserName = "user5",
                Email = "user5@mail.com",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(user5, "password");

            var user6 = new IdentityUser
            {
                UserName = "user6",
                Email = "u5@mail.com",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(user6, "password");
        }
    }

    private static async Task SeedHouseholdsAsync(DatabaseContext context)
    {
        if (!await context.Households.AnyAsync())
        {
            var household = new Household
            {
                Name = "Presentation",
                Code = "ef2fc1",
                Profiles = new List<Profile>(),
                Tasks = new List<HouseholdTask>()
            };

            household.Profiles.Add(new Profile
            {
                Name = "Test Profile",
                User = await context.Users.FirstOrDefaultAsync(u => u.UserName == "user"),
                Role = "admin",
                Avatar = new Avatar
                {
                    Icon = "🐙",
                    Color = "#ee7e86"
                }
            });

            household.Profiles.Add(new Profile
            {
                Name = "Test Profile 2",
                User = await context.Users.FirstOrDefaultAsync(u => u.UserName == "user2"),
                Role = "member",
                Avatar = new Avatar
                {
                    Icon = "🦊",
                    Color = "#f7ad71"
                }
            });

            household.Profiles.Add(new Profile
            {
                Name = "Test Profile 3",
                User = await context.Users.FirstOrDefaultAsync(u => u.UserName == "user3"),
                Role = "member",
                Avatar = new Avatar
                {
                    Icon = "🦄",
                    Color = "#f795e0"
                }
            });

            household.Profiles.Add(new Profile
            {
                Name = "Test Profile 4",
                User = await context.Users.FirstOrDefaultAsync(u => u.UserName == "user4"),
                Role = "member",
                Avatar = new Avatar
                {
                    Icon = "🐋",
                    Color = "#94c3f9"
                }
            });

            household.Profiles.Add(new Profile
            {
                Name = "Test Profile 5",
                User = await context.Users.FirstOrDefaultAsync(u => u.UserName == "user5"),
                Role = "member",
                Avatar = new Avatar
                {
                    Icon = "🦉",
                    Color = "#bc9991"
                }
            });

            household.Profiles.Add(new Profile
            {
                Name = "Test Profile 6",
                User = await context.Users.FirstOrDefaultAsync(u => u.UserName == "user6"),
                Role = "member",
                Avatar = new Avatar
                {
                    Icon = "🐷",
                    Color = "#f9c9c9"
                }
            });

            household.Tasks.Add(new HouseholdTask
            {
                Title = "Laga mat",
                Description = "Laga mat till alla",
                Effort = 1,
                Frequency = 1,
                createdDateTask = DateTime.Now - TimeSpan.FromDays(1),
                History = new List<TaskHistory>(
                    new TaskHistory[]
                    {
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 6"),
                            Date = DateTime.Now,
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 2"),
                            Date = DateTime.Now,
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 4"),
                            Date = DateTime.Now,
                        },
                    }
                )
            });

            household.Tasks.Add(new HouseholdTask
            {
                Title = "Damma",
                Description = "Damma huset",
                Effort = 3,
                Frequency = 7,
                createdDateTask = DateTime.Now - TimeSpan.FromDays(7),
                History = new List<TaskHistory>()
            });

            household.Tasks.Add(new HouseholdTask
            {
                Title = "Diska",
                Description = "Diska efter matlagningen",
                Effort = 2,
                Frequency = 3,
                createdDateTask = DateTime.Now - TimeSpan.FromDays(12),
                History = new List<TaskHistory>(
                    new TaskHistory[]
                    {
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 3"),
                            Date = DateTime.Now,
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 5"),
                            Date = DateTime.Now,
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 2"),
                            Date = DateTime.Now - TimeSpan.FromDays(5),
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 2"),
                            Date = DateTime.Now - TimeSpan.FromDays(10),
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 5"),
                            Date = DateTime.Now - TimeSpan.FromDays(10),
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile"),
                            Date = DateTime.Now - TimeSpan.FromDays(5),
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 3"),
                            Date = DateTime.Now - TimeSpan.FromDays(5),
                        },
                    }
                )
            });

            household.Tasks.Add(new HouseholdTask
            {
                Title = "Ta hand on My",
                Description = "Ta hand om My",
                Effort = 4,
                Frequency = 14,
                createdDateTask = DateTime.Now - TimeSpan.FromDays(33),
                History = new List<TaskHistory>(
                    new TaskHistory[]
                    {
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(),
                            Date = DateTime.Now,
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 6"),
                            Date = DateTime.Now - TimeSpan.FromDays(10),
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 3"),
                            Date = DateTime.Now - TimeSpan.FromDays(10),
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 2"),
                            Date = DateTime.Now - TimeSpan.FromDays(5),
                        },
                    }
                )
            });

            household.Tasks.Add(new HouseholdTask
            {
                Title = "Torka golvet",
                Description = "Torka golvet",
                Effort = 4,
                Frequency = 14,
                createdDateTask = DateTime.Now - TimeSpan.FromDays(100),
                History = new List<TaskHistory>(
                    new TaskHistory[]
                    {
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile"),
                            Date = DateTime.Now - TimeSpan.FromDays(40),
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 2"),
                            Date = DateTime.Now - TimeSpan.FromDays(41),
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(),
                            Date = DateTime.Now - TimeSpan.FromDays(24),
                        },
                    }
                )
            });

            household.Tasks.Add(new HouseholdTask
            {
                Title = "Vattna blommor",
                Description = "Vattna blommor",
                Effort = 4,
                Frequency = 14,
                createdDateTask = DateTime.Now - TimeSpan.FromDays(14),
                History = new List<TaskHistory>(
                    new TaskHistory[]
                    {
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 3"),
                            Date = DateTime.Now,
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 4"),
                            Date = DateTime.Now,
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 5"),
                            Date = DateTime.Now - TimeSpan.FromDays(10),
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile"),
                            Date = DateTime.Now - TimeSpan.FromDays(5),
                        },
                        new TaskHistory
                        {
                            Profile = household.Profiles.FirstOrDefault(p => p.Name == "Test Profile 3"),
                            Date = DateTime.Now - TimeSpan.FromDays(5),
                        },
                    }
                )
            });

            household.Applications = new List<Application>();

            context.Households.Add(household);
            await context.SaveChangesAsync();
        }
    }
}