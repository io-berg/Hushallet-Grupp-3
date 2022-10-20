using Microsoft.AspNetCore.Identity;

namespace Server.Data.Models;

public class Application
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public IdentityUser User { get; set; }
    public Household Household { get; set; }
    public bool Accepted { get; set; }
}