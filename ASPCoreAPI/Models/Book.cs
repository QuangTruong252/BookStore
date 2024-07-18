using System.ComponentModel.DataAnnotations;

namespace ASPCoreAPI.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(100), Required]
        public string Title { get; set; }
        public string? Description { get; set; }
        public string Author { get; set; }
        [Range(0, double.MaxValue)]
        public double Price { get; set; }
        [Range(0, 4)]
        public int Star { get; set; }

    }
}
