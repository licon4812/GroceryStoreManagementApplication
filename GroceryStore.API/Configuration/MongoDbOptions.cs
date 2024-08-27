namespace GroceryStore.API.Configuration
{
    public class MongoDbOptions
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string AislesCollectionName { get; set; }
        public string ProductsCollectionName { get; set; }
    }
}
