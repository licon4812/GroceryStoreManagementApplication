using System;
using System.Collections.Generic;
using System.Linq;

namespace GroceryStore.API.Models.Responses.Product
{
    public class GetInventoryOverviewResponse
    {
        public int TotalProducts { get; set; }
        public int TotalAisles { get; set; }
        public int TotalExpiring => ProductOverviews.Sum(po => po.SumExpiring);
        public int TotalPurchased => ProductOverviews.Sum(po => po.SumPurchased);
        public List<ProductOverview> ProductOverviews { get; set; }
    }
}
