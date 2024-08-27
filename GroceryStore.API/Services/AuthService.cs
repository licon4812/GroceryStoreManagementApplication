using GroceryStore.API.Configuration;
using GroceryStore.API.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GroceryStore.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly string _key;

        public AuthService(IOptions<JwtOptions> jwtOptions)
        { 
            _key = jwtOptions.Value.Key;
        }

        public string Authenticate(string username, string password)
        {
            // Place Holder Auth for demo purposes, this should really go through OIDC/OAuth/...
            if (username == "something memorable" && password == "something very secure")
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenKey = Encoding.ASCII.GetBytes(_key);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new (ClaimTypes.Name, username),
                        new (ClaimTypes.Role, "Admin") // Assign roles if needed
                    }),
                    Expires = DateTime.UtcNow.AddHours(1), // Default 1 Hour Expiry
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }

            // Return null if authentication fails
            throw new UnauthorizedAccessException();
        }
    }
}
