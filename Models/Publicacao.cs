using System.ComponentModel.DataAnnotations;

namespace RenderGallery.Models
{
    public class Publicacao
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(250)]
        public string Nome { get; set; }
        [StringLength(250)]
        public string Descricao { get; set; }
        public int like { get; set; }
        public int deslike { get; set; }
        public DateTime dataHora { get; set; }
        public int Artista_Id { get; set; }
        public virtual Artista Artista { get; set; }
        public List<Art>? Artes { get; set; }
    }
}
