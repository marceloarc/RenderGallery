namespace RenderGallery.Models
{
    public class ProdutoCarrinho
    {
        public int Id { get; set; }

        public  int User_id { get; set; }        
        public List<Publicacao>? Publicacaos { get; set; }

        public virtual User User { get; set; }

        public List<Art>? Artes { get; set; }

    }
}
