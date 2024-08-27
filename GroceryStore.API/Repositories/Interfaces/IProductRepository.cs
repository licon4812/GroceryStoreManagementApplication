using GroceryStore.API.Models.Requests.Product;
using GroceryStore.API.Models.Responses.Product;
using System.Threading.Tasks;

namespace GroceryStore.API.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<CreateProductResponse> CreateProduct(CreateProductRequest request);
        Task<GetProductsResponse> GetProducts();
        Task<GetProductResponse> GetProductById(string id);
        Task<GetProductsResponse> GetProductsByAisleId(string id);
        Task<UpdateProductResponse> UpdateProduct(UpdateProductRequest request);
        Task<DeleteProductResponse> DeleteProduct(string id);
    }
}
