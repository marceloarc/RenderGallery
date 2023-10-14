namespace RenderGallery.Models
{
    public class ProdutoCarrinho
    {
        public int Id { get; set; }

        public  int User_id { get; set; }        
        public virtual List<Publicacao>? Publicacaos { get; set; }

        public virtual User User { get; set; }

        public virtual List<Art>? Artes { get; set; }

    }
}
