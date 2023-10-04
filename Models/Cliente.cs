using System.ComponentModel.DataAnnotations;

namespace RenderGallery.Models
{
    public class Cliente
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(250)]
        public string document { get; set; }
        [Required]
        public DateTime dataHora { get; set; }

        public int User_Id { get; set; }
        public virtual User User { get; set; }
        public int Favoritos_Id { get; set; }
        public virtual Favoritos Favoritos { get; set; }
        public List<Tags>? Tags { get; set; }
    }
}
