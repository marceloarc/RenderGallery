using System.ComponentModel.DataAnnotations;

namespace RenderGallery.Models
{
    public class Art
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(250)]
        public string Arte { get; set; }
        [Required]
        public float Valor { get; set; }
        [Required]
        public int Quantidade { get; set; }
        [Required]
        [StringLength(250)]
        public string Hash { get; set;}
        [Required]
        public DateTime dataHora { get; set; }
        public List<Tags>? Tags { get; set; }

    }
}
