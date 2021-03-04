using Example.API.Models.User;
using System.Threading.Tasks;

namespace Example.API.Repositories
{
    public interface IUserRepository
    {
        Task<UserModel> Register(UserModel user, string password); 
        Task<UserModel> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}