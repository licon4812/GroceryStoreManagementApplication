using GroceryStore.API.Configuration;
using GroceryStore.API.Repositories;
using GroceryStore.API.Repositories.Interfaces;
using GroceryStore.API.Services;
using GroceryStore.API.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;

namespace GroceryStore.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddGroceryStoreAuth(this IServiceCollection services, string key)
        {
            // JWT Auth
            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opts =>
            {
                opts.RequireHttpsMetadata = false;
                opts.SaveToken = true;
                opts.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false, // Placeholder, We don't need to validate the issuer
                    ValidateAudience = false, // Placeholder, We don't need to validate the audience
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key))
                };
            });

            services.AddScoped<IAuthService, AuthService>();

            return services;
        }

        public static IServiceCollection AddGroceryStoreRepositories(this IServiceCollection services)
        {
            services.AddScoped<IAisleRepository, AisleRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();

            return services;
        }

        public static IServiceCollection AddGroceryStoreServices(this IServiceCollection services)
        {
            services.AddScoped<IAisleService, AisleService>();
            services.AddScoped<IProductService, ProductService>();

            return services;
        }

        public static IServiceCollection AddMongoDb(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<MongoDbOptions>(config.GetSection("MongoDb"));

            services.AddSingleton<IMongoClient>(sp =>
            {
                var settings = sp.GetRequiredService<IOptions<MongoDbOptions>>().Value;

                return new MongoClient(settings.ConnectionString);
            });

            services.AddSingleton<IMongoDatabase>(sp =>
            {
                var settings = sp.GetRequiredService<IOptions<MongoDbOptions>>().Value;

                var client = sp.GetRequiredService<IMongoClient>();

                return client.GetDatabase(settings.DatabaseName);
            });

            return services;
        }
    }
}
