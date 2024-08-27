namespace GroceryStore.API.Models.Responses.Product
{
    public class GetProductResponse
    {
        public Models.Product Product { get; set; }

        public GetProductResponse(Models.Product product)
        {
            Product = product;
        }
    }
}