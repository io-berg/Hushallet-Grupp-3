using System.ComponentModel.DataAnnotations;

namespace Server.Data.Models.Auth;

public class RegisterModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}