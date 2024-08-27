using System;

namespace GroceryStore.API.Models.Requests.Product {
    public class GetInventoryOverviewRequest {
        public DateTime PurchaseDate { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}