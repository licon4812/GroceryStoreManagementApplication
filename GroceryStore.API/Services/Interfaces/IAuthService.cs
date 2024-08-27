namespace GroceryStore.API.Services.Interfaces
{
    public interface IAuthService
    {
        public string Authenticate(string username, string password);
    }
}
