using System.Collections.Generic;
using System.Linq;

namespace GroceryStore.API.Models.Responses.Product
{
    public class GetProductsResponse
    {
        public List<Models.Product> Products { get; set; }
        public int Total { get; set; }

        public GetProductsResponse(List<Models.Product> products)
        {
            Products = products;
            Total = products.Sum(p => p.Quantity);
        }
    }
}