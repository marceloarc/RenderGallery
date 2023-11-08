using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RenderGallery.Models
{
    public class Art
    {
        [Key]
        public int Id { get; set; }
        
        [StringLength(250)]
        public string? Arte { get; set; }

        [NotMapped]
        public IFormFile? file { get; set; }

        
        public float Valor { get; set; }
        
        public int Quantidade { get; set; }
      
        [StringLength(250)]
        public string? Hash { get; set;}
     
        public DateTime dataHora { get; set; }
        public virtual List<Tags>? Tags { get; set; }

    }
}
