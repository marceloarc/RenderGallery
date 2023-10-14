using System.ComponentModel.DataAnnotations;

namespace RenderGallery.Models
{
    public class Favoritos
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public virtual List<Publicacao>? Publicacaos { get; set; }

    }
}
