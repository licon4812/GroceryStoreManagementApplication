using System;

namespace GroceryStore.API.Models
{
    public class ProductOverview
    {
        public string Name { get; set; }
        public int SumProducts { get; set; }
        public int SumExpiring { get; set; }

        public int SumPurchased { get; set; }
    }
}
