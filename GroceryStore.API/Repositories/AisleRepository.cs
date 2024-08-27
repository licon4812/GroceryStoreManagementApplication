using GroceryStore.API.Configuration;
using GroceryStore.API.Models;
using GroceryStore.API.Models.Requests.Aisle;
using GroceryStore.API.Models.Responses.Aisle;
using GroceryStore.API.Repositories.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace GroceryStore.API.Repositories
{
    public class AisleRepository : IAisleRepository
    {
        private readonly IMongoCollection<Aisle> _collection;

        public AisleRepository(IOptions<MongoDbOptions> options, IMongoDatabase database)
        {

            _collection = database.GetCollection<Aisle>(options.Value.AislesCollectionName);
        }

        public async Task<CreateAisleResponse> CreateAisle(CreateAisleRequest request)
        {
            var aisleRequest = new Aisle
            {
                CreatedBy = request.CreatedBy,
                Name = request.Name,
            };
            
            await _collection.InsertOneAsync(aisleRequest);

            var response = new CreateAisleResponse { };

            return response;
        }

        public async Task<GetAislesResponse> GetAisles()
        {
            var aisles = await _collection.Find(f => true).ToListAsync();

            var resp = new GetAislesResponse(aisles);

            return resp;
        }

        public async Task<GetAisleResponse> GetAisleById(string id)
        {
            var aisle = await _collection.FindAsync(Builders<Aisle>.Filter.Eq(aisle => aisle.Id, id));

            var resp = new GetAisleResponse(aisle.SingleOrDefault());

            return resp;
        }

        public async Task<GetAisleResponse> GetAisleByName(string name)
        {
            var aisle = await _collection.FindAsync(Builders<Aisle>.Filter.Eq(aisle => aisle.Name, name));

            var resp = new GetAisleResponse(aisle.SingleOrDefault());

            return resp;
        }

        public async Task<UpdateAisleResponse> UpdateAisle(UpdateAisleRequest request)
        {
            var filter = Builders<Aisle>.Filter.Eq(aisle => aisle.Id, request.Id);
            var update = Builders<Aisle>.Update
                            .Set(aisle => aisle.Name, request.Name)
                            .Set(aisle => aisle.ModifiedOn, DateTime.UtcNow)
                            .Set(aisle => aisle.ModifiedBy, request.ModifiedBy);

            await _collection.UpdateOneAsync(filter, update);

            var resp = new UpdateAisleResponse();

            return resp;
        }

        public async Task<DeleteAisleResponse> DeleteAisle(string id)
        {
            var aisle = _collection.Find(Builders<Aisle>.Filter.Eq(aisle => aisle.Id, id));

            var response = new DeleteAisleResponse { };

            if (aisle != null)
            {
                await _collection.DeleteOneAsync(Builders<Aisle>.Filter.Eq(aisle => aisle.Id, id));
            }

            return response;
        }
    }
}
