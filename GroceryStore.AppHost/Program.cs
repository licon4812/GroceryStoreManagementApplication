var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.GroceryStore_API>("grocerystore-api");

builder.AddDockerfile("grocerystore-web", "../GroceryStore.Web/")
    .WithHttpEndpoint(port: 4200, targetPort: 4200)
    .WithReference(api);

builder.Build().Run();
