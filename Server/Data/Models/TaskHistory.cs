namespace Server.Data.Models;

public class TaskHistory
{
    public int Id { get; set; }
    public int ProfileId { get; set; }
    public Profile Profile { get; set; }
    public DateTime Date { get; set; }
}