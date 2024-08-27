using GroceryStore.API.Exceptions.Aisle;
using GroceryStore.API.Models.Requests.Aisle;
using GroceryStore.API.Models.Responses.Aisle;
using GroceryStore.API.Repositories.Interfaces;
using GroceryStore.API.Services.Interfaces;
using System.Threading.Tasks;

namespace GroceryStore.API.Services
{
    public class AisleService : IAisleService
    {
        private readonly IAisleRepository _aisleRepository;

        public AisleService(IAisleRepository repository)
        {
            _aisleRepository = repository;
        }

        public async Task<CreateAisleResponse> CreateAisle(CreateAisleRequest request)
        {
            var resp = await _aisleRepository.GetAisleByName(request.Name);

            if (resp.Aisle?.Name == request.Name)
                throw new DuplicateAisleNameException(request.Name);

            return await _aisleRepository.CreateAisle(request);
        }

        public async Task<GetAisleResponse> GetAisle(string id)
        {
            var resp = await _aisleRepository.GetAisleById(id);

            if (resp.Aisle == null)
                throw new AisleNotFoundException(id);

            return resp;
        }

        public async Task<GetAislesResponse> GetAisles()
        {
            return await _aisleRepository.GetAisles();
        }

        public async Task<UpdateAisleResponse> UpdateAisle(UpdateAisleRequest request)
        {
            var resp = await _aisleRepository.GetAisleById(request.Id);

            if (resp.Aisle == null)
                throw new AisleNotFoundException(request.Id);

            var nameResp = await _aisleRepository.GetAisleByName(request.Name);

            if (resp.Aisle.Name != request.Name && nameResp.Aisle != null)
                throw new DuplicateAisleNameException(request.Name);

            return await _aisleRepository.UpdateAisle(request);
        }

        public async Task<DeleteAisleResponse> DeleteAisle(string id)
        {
            var resp = await _aisleRepository.GetAisleById(id);

            if (resp.Aisle == null)
                throw new AisleNotFoundException(id);

            return await _aisleRepository.DeleteAisle(id);
        }
    }
}
