using GroceryStore.API.Models.Requests.Aisle;
using GroceryStore.API.Models.Responses.Aisle;
using System.Threading.Tasks;

namespace GroceryStore.API.Repositories.Interfaces
{
    public interface IAisleRepository
    {
        Task<CreateAisleResponse> CreateAisle(CreateAisleRequest request);
        Task<GetAislesResponse> GetAisles();
        Task<GetAisleResponse> GetAisleById(string id);
        Task<GetAisleResponse> GetAisleByName(string name);
        Task<UpdateAisleResponse> UpdateAisle(UpdateAisleRequest request);
        Task<DeleteAisleResponse> DeleteAisle(string id);
    }
}
