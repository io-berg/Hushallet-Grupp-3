namespace Server.Data.Models;

public class HouseholdTask
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int Effort { get; set; }
    public int Frequency { get; set; }

    public DateTime createdDateTask { get; set; }
    public List<TaskHistory> History { get; set; }
}