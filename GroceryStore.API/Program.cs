using GroceryStore.API.Configuration;
using GroceryStore.API.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

// Configuration
builder.Services.Configure<DiagnosticsOptions>(builder.Configuration.GetSection("Diganostics"));
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtOptions"));
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

var key = builder.Configuration["JwtOptions:Key"];

// Services
builder.Services.AddGroceryStoreAuth(key);
builder.Services.AddGroceryStoreRepositories();
builder.Services.AddGroceryStoreServices();

builder.Services.AddMongoDb(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        builder.WithOrigins(allowedOrigins)
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
//builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();

var app = builder.Build();

app.MapDefaultEndpoints();


if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}


app.UseCors("AllowSpecificOrigins");

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
