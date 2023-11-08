using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RenderGallery.Models;
using RenderGallery.Util;

namespace RenderGallery.Controllers
{
    [ApiController]
    [Route("art")]
    public class ArtController : Controller
    {
        private readonly DatabaseContext db;
        private string caminhoServidor;

        public ArtController(DatabaseContext db)
        {
            this.db = db;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Upload(Art arte)
        {
            string caminhoArquivo = Functions.WriteFile(arte.file);

            if (string.IsNullOrEmpty(caminhoArquivo))
            {
                return BadRequest("Erro ao fazer o upload da imagem");
            }

            var art = new Art
            {
                Arte = caminhoArquivo,
                Valor = float.Parse(Request.Form["valor"]),
                Quantidade = int.Parse(Request.Form["quantidade"]),
                dataHora = DateTime.Now
            };

            db.Arts.Add(art);
            db.SaveChanges();

            TempData["sucesso"] = "Arte Cadastrada com sucesso!";
            return Ok(TempData);
        }

        private string WriteFile(IFormFile arte)
        {
            throw new NotImplementedException();
        }
    }
}
