namespace Server.Data.Models;

public class CreateTaskModel
{
    public int HouseholdId { get; set; }
    public HouseholdTaskDTO Task { get; set; }
}
