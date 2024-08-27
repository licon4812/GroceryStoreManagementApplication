using System.Collections.Generic;

namespace GroceryStore.API.Models.Responses.Product
{
    public class GetProductsWithAislesResponse
    {
        public List<Models.Product> Products { get; set; }
        public List<Models.Aisle> Aisles { get; set; }

        public GetProductsWithAislesResponse(List<Models.Product> products, List<Models.Aisle> aisles)
        {
            Products = products;
            Aisles = aisles;
        }
    }
}
