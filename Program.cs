using Microsoft.EntityFrameworkCore;
using RenderGallery.Models;
using Microsoft.AspNetCore.Authentication.Cookies;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

//Autenticação feita aqui -->
builder.Services.AddAuthentication(
    CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(option => {
        option.LoginPath = "/Acess/Login";
        option.ExpireTimeSpan = TimeSpan.FromMinutes(20);
    });
builder.Services.AddCors();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdministradorOnly", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("usuario", "Administrador");
    });
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ArtistaOnly", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("usuario", "Artista");
    });
});


builder.Services.AddDbContext<DatabaseContext>(o=>o.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.
    GetConnectionString("DefaultConnection")));

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseCors(opcoes => opcoes.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
    
    );

app.MapFallbackToFile("index.html"); ;

app.Run();
