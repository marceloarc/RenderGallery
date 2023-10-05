using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using RenderGallery.Models;
using RenderGallery.Migrations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace RenderGallery.Controllers
{
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


            if (usuario.Usuario == Models.User.TipoUsuario.Administrador)
            {
                // O usuário é um administrador
            }
            else if (usuario.Usuario == Models.User.TipoUsuario.Cliente || usuario.Usuario == Models.User.TipoUsuario.Artista)
            {
                // O usuário é um cliente ou um artista
                return RedirectToAction("Bar", "Home");
            }

            ViewData["ValidateMessage"] = "user not found";
            return View();

        }

        public async Task<IActionResult> Logoff()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Acess");
        }


    }
}
