using GroceryStore.API.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Net;
using System.Threading.Tasks;

namespace GroceryStore.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DiagnosticsController : ControllerBase
    {
        private readonly string _key;
        private readonly IMongoDatabase _mongoDb;

        public DiagnosticsController(IOptions<DiagnosticsOptions> diagnosticsOptions, IMongoDatabase mongoDb)
        {
            _key = diagnosticsOptions.Value.Key;
            _mongoDb = mongoDb;
        }

        private bool ValidateKey(string key)
        {
            return _key == key;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ping();
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("Pong");
        }

        [HttpGet("simulate/{StatusCode}")]
        public IActionResult Simulate(int StatusCode)
        {
            return Problem(detail:"Simulated Problem", statusCode: StatusCode);
        }

        [HttpGet("mongodb")]
        public async Task<IActionResult> TestMongoDb()
        {
            // Code to validate MongoDb connection
            try
            {
                // Perform a simple operation to test the connection
                var command = new BsonDocument("ping", 1);
                await _mongoDb.RunCommandAsync<BsonDocument>(command);

                return Ok("MongoDB connection is healthy.");
            }
            catch (Exception ex)
            {
                // Log the exception (optional) and return a status code
                // You may also want to return more details or a custom error message
                return StatusCode(500, $"MongoDB connection failed: {ex.Message}");
            }
        }
    }
}
