using GroceryStore.API.Models.Requests.Product;
using GroceryStore.API.Models.Responses.Product;
using System.Threading.Tasks;

namespace GroceryStore.API.Services.Interfaces
{
    public interface IProductService
    {
        Task<CreateProductResponse> CreateProduct(CreateProductRequest request);
        Task<GetProductResponse> GetProductById(string id);
        Task<GetProductsResponse> GetProductByAisleId(string aisleId);
        Task<GetProductsResponse> GetProducts();
        Task<GetProductsWithAislesResponse> GetProductsWithAisles();
        Task<UpdateProductResponse> UpdateProduct(UpdateProductRequest request);
        Task<DeleteProductResponse> DeleteProduct(string id);
        Task<GetInventoryOverviewResponse> GetInventoryOverview(GetInventoryOverviewRequest request);
    }
}
