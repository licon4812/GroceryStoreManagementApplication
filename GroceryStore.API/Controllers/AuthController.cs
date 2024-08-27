using GroceryStore.API.Models.Requests.Auth;
using GroceryStore.API.Models.Responses.Auth;
using GroceryStore.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace GroceryStore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            try
            {
                // Note: This placeholder authentication mechanism is for demonstration purposes only.
                // It should be replaced with a more secure and scalable authentication solution, such as OAuth or OpenID Connect (OIDC),
                // to ensure robust security and proper user identity management in a production environment.
                var token = _authService.Authenticate(request.UserName, request.Password);

                return Ok(new LoginResponse { Token = token });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
        }

        [HttpGet("check")]
        public IActionResult Check()
        {
            return User.Identity.IsAuthenticated ? Ok(User.Identity.Name) : Unauthorized(User.Identity.Name);
        }

        [AllowAnonymous]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Note: This placeholder authentication mechanism is for demonstration purposes only.
            // Log out would be handled in your OAuth/OIDC implementation, or at least track spoiled cookies
            return Ok();
        }
    }
}
