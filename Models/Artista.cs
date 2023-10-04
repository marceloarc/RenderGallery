using System.ComponentModel.DataAnnotations;

namespace RenderGallery.Models
{
    public class Artista
    {
        public int Id { get; set; }
        [Required]
        public DateTime dataHora { get; set; }
        public int User_Id { get; set; }
        public virtual User User { get; set; }
    }
}
