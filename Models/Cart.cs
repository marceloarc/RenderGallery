namespace RenderGallery.Models
{
    public class Cart
    {
        public int Id { get; set; }

        public int user_id { get; set; }
        public virtual User User { get; set; }



    }
}
