namespace Server.Data.Models;

public class HouseholdTaskDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int Effort { get; set; }
    public int Frequency { get; set; }
    public string createdDateTask { get; set; }

    public List<TaskHistoryDTO> TaskHistory { get; set; }
}