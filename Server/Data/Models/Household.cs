namespace Server.Data.Models;

public class Household
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public List<Profile> Profiles { get; set; }
    public List<HouseholdTask> Tasks { get; set; }
    public List<Application> Applications { get; set; }
}