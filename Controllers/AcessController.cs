using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using RenderGallery.Models;
using RenderGallery.Migrations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace RenderGallery.Controllers
{
    [Route("login")]
    [ApiController]
    public class AcessController : Controller
    {

        private readonly DatabaseContext db;

        public AcessController(DatabaseContext rendergalleryContext)
        {
            db = rendergalleryContext;
        }
        public IActionResult Login()
        {
            ClaimsPrincipal claimUser = HttpContext.User;

            if(claimUser.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");

            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Login(VMLogin modelLogin)
        {
            User usuario = db.Users.FirstOrDefault(a => a.Email == modelLogin.Email && a.Password == modelLogin.Password);

            if (usuario == null)
            {
                TempData["erro"] = "Usuário ou senha inválidos";
                return View();
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, usuario.Email),
                new Claim(ClaimTypes.Sid, usuario.Id.ToString())
            };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            AuthenticationProperties properties = new AuthenticationProperties(){
                AllowRefresh = true,
                IsPersistent = modelLogin.KeepLoggedIn
            };

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, 
                new ClaimsPrincipal(claimsIdentity), properties);

            var acess = 3;

            if (usuario.Usuario == Models.User.TipoUsuario.Administrador)
                acess = (int)Models.User.TipoUsuario.Administrador;
            else if (usuario.Usuario == Models.User.TipoUsuario.Cliente)
                acess = (int)Models.User.TipoUsuario.Cliente;
            else if (usuario.Usuario == Models.User.TipoUsuario.Artista)
                acess = (int)Models.User.TipoUsuario.Artista;
            
            return Json(new { access = acess });

        }

        public async Task<IActionResult> Logoff()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Acess");
        }


    }
}
