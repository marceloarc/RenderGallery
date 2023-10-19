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


        [HttpPost]
        public async Task<IActionResult> Login(VMLogin modelLogin)
        {
            User usuario = db.Users.FirstOrDefault(a => a.Email == modelLogin.Email);

            if (usuario == null)
            {
                TempData["erro"] = "Usuário ou senha inválidos";
                return Json(TempData);
            }
            if (BCrypt.Net.BCrypt.Verify(modelLogin.Password, usuario.Password))
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, usuario.Email),
                    new Claim(ClaimTypes.Sid, usuario.Id.ToString())
                };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                AuthenticationProperties properties = new AuthenticationProperties()
                {
                    AllowRefresh = true,
                    IsPersistent = modelLogin.KeepLoggedIn
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity), properties);

                var access = 3;

                if (usuario.Usuario == Models.User.TipoUsuario.Administrador)
                    access = (int)Models.User.TipoUsuario.Administrador;
                else if (usuario.Usuario == Models.User.TipoUsuario.Cliente)
                    access = (int)Models.User.TipoUsuario.Cliente;
                else if (usuario.Usuario == Models.User.TipoUsuario.Artista)
                    access = (int)Models.User.TipoUsuario.Artista;

                return Json(new { access = access });
            }
            else
            {
                TempData["erro"] = "Usuário ou senha inválidos";
                return Json(TempData);
            }

      

        }

        public async Task<IActionResult> Logoff()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Acess");
        }


    }
}
