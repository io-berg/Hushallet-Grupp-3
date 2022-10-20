namespace Server.Data.Models;

public class ProfileDTO
{
    public int Id { get; set; }
    public UserDTO User { get; set; }
    public string Role { get; set; }
    public AvatarDTO Avatar { get; set; }
    public string Name { get; set; }
}