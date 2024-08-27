using GroceryStore.API.Models.Requests.Aisle;
using GroceryStore.API.Models.Responses.Aisle;
using System.Threading.Tasks;

namespace GroceryStore.API.Services.Interfaces
{
    public interface IAisleService
    {
        Task<CreateAisleResponse> CreateAisle(CreateAisleRequest request);
        Task<GetAisleResponse> GetAisle(string id);
        Task<GetAislesResponse> GetAisles();
        Task<UpdateAisleResponse> UpdateAisle(UpdateAisleRequest request);
        Task<DeleteAisleResponse> DeleteAisle(string id);
    }
}
