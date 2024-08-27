using GroceryStore.API.Configuration;
using GroceryStore.API.Models;
using GroceryStore.API.Models.Requests.Product;
using GroceryStore.API.Models.Responses.Product;
using GroceryStore.API.Repositories.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace GroceryStore.API.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IMongoCollection<Product> _collection;

        public ProductRepository(IMongoDatabase database, IOptions<MongoDbOptions> options)
        {
            _collection = database.GetCollection<Product>(options.Value.ProductsCollectionName);
        }

        public async Task<CreateProductResponse> CreateProduct(CreateProductRequest request)
        {
            var product = new Product
            {
                Name = request.Name,
                Quantity = request.Quantity,
                CreatedBy = request.CreatedBy,
                ExpiryDate = request.ExpiryDate,
                Price = request.Price,
                PurchaseDate = request.PurchaseDate,
                AisleId = request.AisleId
            };

            await _collection.InsertOneAsync(product);

            var response = new CreateProductResponse();

            return response;
        }

        public async Task<GetProductsResponse> GetProducts()
        {
            var products = await _collection.FindAsync(Builders<Product>.Filter.Empty);

            var resp = new GetProductsResponse(products.ToList());

            return resp;
        }

        public async Task<GetProductResponse> GetProductById(string id)
        {
            var product = await _collection.FindAsync(Builders<Product>.Filter.Eq(product => product.Id, id));

            var resp = new GetProductResponse(product.SingleOrDefault());

            return resp;
        }

        public async Task<GetProductsResponse> GetProductsByAisleId(string id)
        {
            var products = await _collection.FindAsync(Builders<Product>.Filter.Eq("AisleId", id));

            var resp = new GetProductsResponse(products.ToList());

            return resp;
        }

        public async Task<UpdateProductResponse> UpdateProduct(UpdateProductRequest request)
        {
            var filter = Builders<Product>.Filter.Eq(product => product.Id, request.Id);
            var update = Builders<Product>.Update
                .Set(product => product.Name, request.Name)
                .Set(product => product.Price, request.Price.Value)
                .Set(product => product.Quantity, request.Quantity.Value)
                .Set(product => product.ExpiryDate, request.ExpiryDate.Value)
                .Set(product => product.PurchaseDate, request.PurchaseDate.Value)
                .Set(product => product.AisleId, request.AisleId)
                .Set(product => product.ModifiedOn, DateTime.Now)
                .Set(product => product.ModifiedBy, request.ModifiedBy);

            await _collection.UpdateOneAsync(filter, update);

            var resp = new UpdateProductResponse { };

            return resp;
        }

        public async Task<DeleteProductResponse> DeleteProduct(string id)
        {
            var product = await _collection.FindAsync(Builders<Product>.Filter.Eq(product => product.Id, id));

            var resp = new DeleteProductResponse { };

            if (product != null)
            {
                await _collection.DeleteOneAsync(Builders<Product>.Filter.Eq(product => product.Id , id));
            }

            return resp;
        }
    }
}
