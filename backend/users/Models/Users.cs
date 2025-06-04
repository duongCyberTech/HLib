using System.ComponentModel.DataAnnotations;
namespace users.Models
{
    public class User
    {
        [Key]
        public string Uid { get; set; } = "";

        public string? FName { get; set; }
        public string? MName { get; set; }
        public string? LName { get; set; }
        public string? Username { get; set; }

        public string? Email { get; set; }
        public string? Password { get; set; }
        public bool Status { get; set; } = true;
        public string? Role { get; set; }

        public string? Avata { get; set; }

        public decimal Salary { get; set; } = 0.00M;
    }
}
