using Microsoft.AspNetCore.Mvc;
using RenderGallery.Models;
using System;
using System.Data.Entity;

namespace RenderGallery.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : Controller
    {
        private readonly DatabaseContext db;


        public UserController(DatabaseContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public List<Artista> Get()
        {
            List<Artista> customers = new List<Artista>();
            customers = db.Artistas.Include(a => a.User.Name).ToList();
      
            return customers;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> RegisterArtista(Artista artista)
        {
            if(ModelState.IsValid) 
            {
                User user = db.Users.Where(x => x.Email == artista.User.Email).FirstOrDefault();

                if(user!=null)
                {
                    TempData["erro"] = "Artista já cadastrado!";
                    return Ok(TempData);

                }
                else
                {
                    string hash = BCrypt.Net.BCrypt.HashPassword(artista.User.Password);
                    artista.User.Password = hash;
                    artista.User.Usuario = Models.User.TipoUsuario.Artista;
                    artista.dataHora = DateTime.Now;
                    db.Artistas.Add(artista);
                    db.SaveChanges();
                    TempData["sucesso"] = "Artista Cadastrado com sucesso!";
                    return Ok(TempData);
                }

            }
            else
            {
                TempData["erro"] = "Algo deu errado!";
                return Ok(TempData);
            }
            
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> RegisterCliente(Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                User user = db.Users.Where(x => x.Email == cliente.User.Email).FirstOrDefault();

                if (user != null)
                {
                    TempData["erro"] = "Cliente já cadastrado!";
                    return Ok(TempData);

                }
                else
                {
                    string hash = BCrypt.Net.BCrypt.HashPassword(cliente.User.Password);
                    cliente.User.Password = hash;
                    cliente.User.Usuario = Models.User.TipoUsuario.Cliente;
                    cliente.dataHora = DateTime.Now;
                    db.Clientes.Add(cliente);
                    db.SaveChanges();
                    TempData["sucesso"] = "Cliente Cadastrado com sucesso!";
                    return Ok(TempData);
                }

            }
            else
            {
                TempData["erro"] = "Algo deu errado!";
                return Ok(TempData);
            }

        }

    }
}