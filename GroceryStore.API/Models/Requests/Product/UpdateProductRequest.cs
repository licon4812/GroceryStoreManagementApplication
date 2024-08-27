using System;

namespace GroceryStore.API.Models.Requests.Product
{
    public class UpdateProductRequest
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public string AisleId { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }

    }
}
