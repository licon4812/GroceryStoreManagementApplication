using GroceryStore.API.Exceptions.Aisle;
using GroceryStore.API.Exceptions.Product;
using GroceryStore.API.Models;
using GroceryStore.API.Models.Requests.Product;
using GroceryStore.API.Models.Responses.Product;
using GroceryStore.API.Repositories.Interfaces;
using GroceryStore.API.Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore.API.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IAisleRepository _aisleRepository;

        public ProductService(IProductRepository productRepository, IAisleRepository aisleRepository)
        {
            _productRepository = productRepository;
            _aisleRepository = aisleRepository;
        }

        public async Task<CreateProductResponse> CreateProduct(CreateProductRequest request)
        {
            var resp = await _aisleRepository.GetAisleById(request.AisleId);

            if (resp.Aisle == null)
                throw new AisleNotFoundException(request.AisleId);

            return await _productRepository.CreateProduct(request);
        }

        public async Task<GetProductResponse> GetProductById(string id)
        {
            var resp = await _productRepository.GetProductById(id);

            if (resp.Product == null)
                throw new ProductNotFoundException(id);

            return resp;
        }

        public async Task<GetProductsResponse> GetProductByAisleId(string aisleId)
        {
            var aisleResponse = await _aisleRepository.GetAisleById(aisleId);

            if (aisleResponse.Aisle == null)
                throw new AisleNotFoundException(aisleId);

            var resp = await _productRepository.GetProductsByAisleId(aisleId);

            if (resp.Products == null)
                throw new ProductNotFoundException();

            return resp;
        }

        public async Task<GetProductsResponse> GetProducts()
        {
            return await _productRepository.GetProducts();
        }

        public async Task<GetProductsWithAislesResponse> GetProductsWithAisles()
        {
            var products = await _productRepository.GetProducts();

            var aisles = await _aisleRepository.GetAisles();


            // Note: More performant joins were considered but not implemented due to project scope.
            // For demo purposes, filtering is handled on the front end, which is acknowledged as less efficient. 
            // Further optimization could involve implementing backend pagination and filtering if required.
            var response = new GetProductsWithAislesResponse(products.Products, aisles.Aisles);

            return response;
        }

        public async Task<UpdateProductResponse> UpdateProduct(UpdateProductRequest request)
        {
            var resp = await _productRepository.GetProductById(request.Id);

            if (resp.Product == null)
                throw new ProductNotFoundException(request.Id);

            return await _productRepository.UpdateProduct(request);
        }

        public async Task<DeleteProductResponse> DeleteProduct(string id)
        {
            var resp = await _productRepository.GetProductById(id);

            if (resp.Product == null)
                throw new ProductNotFoundException(id);

            return await _productRepository.DeleteProduct(id);
        }

        public async Task<GetInventoryOverviewResponse> GetInventoryOverview(GetInventoryOverviewRequest request)
        {
            var productQuery = await _productRepository.GetProducts();

            var aisleQuery = await _aisleRepository.GetAisles();

            var response = new GetInventoryOverviewResponse {
                TotalProducts = productQuery.Total,
                TotalAisles = aisleQuery.Aisles.Count,
                ProductOverviews = productQuery.Products
                                    .GroupBy(p => p.Name)
                                    .Select(group => new ProductOverview() {
                                        Name = group.Key,
                                        SumProducts = group.Sum(p => p.Quantity),
                                        SumExpiring = group.Where(p => p.ExpiryDate <= request.ExpiryDate).Sum(p => p.Quantity),
                                        SumPurchased = group.Where(p => p.PurchaseDate >= request.PurchaseDate).Sum(p => p.Quantity)
                                    }).ToList()
            };

            return response;
        }
    }
}
