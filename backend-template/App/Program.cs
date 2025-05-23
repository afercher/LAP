using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Webshop.App.src.main.Services;
using Microsoft.Extensions.FileProviders;
using Webshop.Models.DB;
using Webshop.Services;
using System;
using System.IO;

var loadData = false;
var builder = WebApplication.CreateBuilder(args);

// Lade die Umgebungsvariablen aus der .env-Datei
Env.Load("backend.env");

// Konfiguriere die Datenbankverbindung
var connectionString = $"Host={Environment.GetEnvironmentVariable("POSTGRES_HOST")};" +
                       $"Port={Environment.GetEnvironmentVariable("POSTGRES_PORT")};" + 
                       $"Database={Environment.GetEnvironmentVariable("POSTGRES_DB")};" + 
                       $"Username={Environment.GetEnvironmentVariable("POSTGRES_USER")};" + 
                       $"Password={Environment.GetEnvironmentVariable("POSTGRES_PASSWORD")}";

// Add services to the container.
builder.Services.AddLogging();
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString),
ServiceLifetime.Scoped // Standardmäßig scoped
    );
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<CategorieService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<CartService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // Erlaubt dein React-Frontend
                .AllowCredentials()  // <- WICHTIG: Ermöglicht das Setzen von Cookies
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.MapWhen(context => context.Request.Path.StartsWithSegments("/api/assets"), subApp =>
{
    subApp.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/assets")),
        RequestPath = "/api/assets"
    });
});

app.UseHttpsRedirection();

app.UseCors("AllowAll"); // ⬅️ Stelle sicher, dass das VOR Authorization & Controllers ist

app.UseAuthorization();
app.MapControllers();


using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    
    // make sure db exist
    context.Database.EnsureCreated();
    
    // read sql and execute it
    var sqlFilePath = "sql/test.sql"; // Pfad zur SQL-Datei
    if (File.Exists(sqlFilePath) && loadData)
    {
        var sqlQuery = File.ReadAllText(sqlFilePath); // Inhalt der SQL-Datei einlesen
        var rowsModified = context.Database.ExecuteSqlRaw(sqlQuery); // SQL ausführen
        Console.WriteLine($"{rowsModified} rows were modified by the SQL script.");
    }
    else
    {
        Console.WriteLine($"Die SQL-Datei '{sqlFilePath}' wurde nicht gefunden.");
    }
}

Console.WriteLine("Die Anwendung wurde gestartet.");
app.Run();
