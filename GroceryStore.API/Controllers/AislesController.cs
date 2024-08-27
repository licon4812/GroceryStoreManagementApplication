using GroceryStore.API.Exceptions.Aisle;
using GroceryStore.API.Models.Requests.Aisle;
using GroceryStore.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace GroceryStore.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class AislesController : ControllerBase
    {
        private readonly IAisleService _aisleService;

        public AislesController(IAisleService aisleService)
        {
            _aisleService = aisleService;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var aisles = await _aisleService.GetAisles();

                // Note: Pagination and backend filtering were considered but not implemented due to project scope.
                // For demo purposes, filtering is handled on the front end, which is acknowledged as less efficient. 
                // Further optimization could involve implementing backend pagination and filtering if required.
                return Ok(aisles);
            }
            catch (AisleNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([Length(24,24)] string id)
        {
            try
            {
                var resp = await _aisleService.GetAisle(id);

                return Ok(resp);
            }
            catch (AisleNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateAisleRequest request)
        {
            request.CreatedBy = User.Identity.Name;

            var resp = await _aisleService.CreateAisle(request);

            return Ok(resp);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateAisleRequest request)
        { 
            try
            {
                request.ModifiedBy = User.Identity.Name;

                var response = await _aisleService.UpdateAisle(request);

                return Ok(response);
            }
            catch (AisleNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var response = await _aisleService.DeleteAisle(id);

                return Ok(response);
            }
            catch (AisleNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
