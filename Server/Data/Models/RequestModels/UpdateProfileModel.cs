namespace Server.Data.Models;

public class UpdateProfileModel
{
    public int HouseholdId { get; set; }

    public int ProfileId { get; set; }
    public string Color { get; set; }

    public string Name { get; set; }

    public string Icon { get; set; }
}