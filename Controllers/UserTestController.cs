using Microsoft.AspNetCore.Mvc;
using RenderGallery.Models;

namespace RenderGallery.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserTestController : ControllerBase
    {
        private readonly DatabaseContext db;


        public UserTestController(DatabaseContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public List<User> Get()
        {
           
            User user = new User();

            user.Name = "Marcelo";
            user.Email = "marceloaugusto96@hotmail.com";
            user.Password = "vidaloka";
            user.Pic = "hue";
            db.Users.Add(user);
            db.SaveChanges();


            List<User> users = new List<User>();

            users = db.Users.ToList();

            return users;
        }
    }
}