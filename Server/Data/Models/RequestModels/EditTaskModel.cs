namespace Server.Data.Models;

public class EditTaskModel
{
    public int HouseholdId { get; set; }
    public HouseholdTaskDTO Task { get; set; }
}
