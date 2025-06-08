using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Caching.Distributed;
using ProjetoRedesBackEnd.Interfaces;
using ProjetoRedesBackEnd.Services;
using ProjetoRedesBackEnd.Settings;

var builder = WebApplication.CreateBuilder(args);


builder.Services.Configure<BookStoreDatabaseSettings>(
    builder.Configuration.GetSection("BookStoreDatabase"));

builder.Services.AddScoped<BooksService>();

// manual decoration:
builder.Services.AddScoped<IBooksService>(provider =>
{
    var BasketRepository = provider.GetRequiredService<BooksService>();
    return new CachedBooksService(BasketRepository, provider.GetRequiredService<IDistributedCache>());
});

builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis");
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers()
    .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

builder.Services.AddOpenApi();

builder.Services.AddHealthChecks()
    .AddRedis(builder.Configuration.GetConnectionString("Redis") ?? "");

var app = builder.Build();

app.MapOpenApi();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/openapi/v1.json", "v1");
    options.RoutePrefix = string.Empty;
});

app.UseHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});
// if (app.Environment.IsDevelopment())
// {
// }

app.UseRouting();

app.UseAuthorization();
app.MapControllers();

app.Run();
