using System;

namespace GroceryStore.API.Models.Requests.Aisle
{
    public class UpdateAisleRequest
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; } = DateTime.Now;
    }
}
