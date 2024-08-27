using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace GroceryStore.API.Models
{
    public class BaseEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
    }
}
