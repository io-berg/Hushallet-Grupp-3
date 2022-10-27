namespace Server.Data.Models;

public class CreateTaskHistoryModel
{

    public TaskHistoryDTO Task { get; set; }

    public int TaskId { get; set; }

    public int HouseholdId { get; set; }
}
