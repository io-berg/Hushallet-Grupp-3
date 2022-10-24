namespace Server.Data.Models;

public class HouseholdDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public List<ProfileDTO> Profiles { get; set; }
    public List<HouseholdTaskDTO> Tasks { get; set; }
    public List<ApplicationDTO> Applications { get; set; }
}