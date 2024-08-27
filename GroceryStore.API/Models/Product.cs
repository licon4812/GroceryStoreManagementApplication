using System;
using System.ComponentModel.DataAnnotations;

namespace GroceryStore.API.Models
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTimeOffset ExpiryDate { get; set; }
        public DateTimeOffset PurchaseDate {  get; set; }
        [Length(24,24)]
        public string AisleId { get; set; }
    }
}
