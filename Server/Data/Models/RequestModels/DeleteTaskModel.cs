namespace Server.Data.Models;

public class DeleteTaskModel
{
    public int HouseholdId { get; set; }
    public HouseholdTaskDTO Task { get; set; }
}
