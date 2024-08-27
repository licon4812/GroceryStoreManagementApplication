using GroceryStore.API.Exceptions.Product;
using GroceryStore.API.Models.Requests.Product;
using GroceryStore.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace GroceryStore.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await _productService.GetProductsWithAisles();

            // Note: Pagination and backend filtering were considered but not implemented due to project scope.
            // For demo purposes, filtering is handled on the front end, which is acknowledged as less efficient. 
            // Further optimization could involve implementing backend pagination and filtering if required.
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([Length(24, 24)] string id)
        {
            try
            {
                var response = await _productService.GetProductById(id);

                return Ok(response);
            }
            catch (ProductNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("aisle/{aisleId}")]
        public async Task<IActionResult> GetByAisleId([Length(24, 24)] string aisleId)
        {
            try
            {
                var response = await _productService.GetProductByAisleId(aisleId);

                return Ok(response);
            }
            catch (ProductNotFoundException)
            {
                return NotFound();
            }            
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateProductRequest request)
        {
            request.CreatedBy = User.Identity.Name;

            var resp = await _productService.CreateProduct(request);

            return Ok(resp);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateProductRequest request)
        {
            try
            {
                request.ModifiedBy = User.Identity.Name;

                var response = await _productService.UpdateProduct(request);

                return Ok(response);
            } 
            catch (ProductNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var response = await _productService.DeleteProduct(id);

                return Ok(response);
            }
            catch (ProductNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("overview")]
        public async Task<IActionResult> GetInventoryOverview([FromQuery] DateTime purchaseDate, [FromQuery] DateTime expiryDate)
        {
            var request = new GetInventoryOverviewRequest {
                ExpiryDate = expiryDate,
                PurchaseDate = purchaseDate
            };

            var response = await _productService.GetInventoryOverview(request);

            return Ok(response);
        }
    }
}
