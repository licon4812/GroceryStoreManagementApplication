namespace GroceryStore.API.Models.Responses.Aisle
{
    public class GetAisleResponse
    {
        public Models.Aisle Aisle { get; set; }

        public GetAisleResponse(Models.Aisle aisle)
        {
            Aisle = aisle;
        }
    }
}
