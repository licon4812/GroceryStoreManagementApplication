using System.Collections.Generic;

namespace GroceryStore.API.Models.Responses.Aisle
{
    public class GetAislesResponse
    {
        public List<Models.Aisle> Aisles { get; set; }

        public GetAislesResponse(List<Models.Aisle> aisles)
        {
            Aisles = aisles;
        }
    }
}
