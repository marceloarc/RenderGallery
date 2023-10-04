using System.ComponentModel.DataAnnotations;

namespace RenderGallery.Models
{
    public class ArtDefinicoes
    {
        [Key] 
        public int Id { get; set; }
        public enum categorias { digital = 0, fisico = 1 }
        public enum tipo { unico = 0, direito = 1 }
    }
}
