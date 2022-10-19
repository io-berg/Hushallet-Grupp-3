using Microsoft.AspNetCore.Identity;

namespace Server.Data.Models;

public class Profile
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public IdentityUser User { get; set; }
    public string Role { get; set; }
    public Avatar Avatar { get; set; }
    public string Name { get; set; }
}