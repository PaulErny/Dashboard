using System.Threading.Tasks;
using Example.API.Contexts;
using Example.API.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Example.API.Repositories
{
    public sealed class UserRepository : IUserRepository
    {

        private readonly UserContext _context;

        public UserRepository(UserContext context) {
            _context = context;
        }

        public async Task<UserModel> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username); //Get user from database.
            if (user == null)
            {
                return null; // User does not exist.
            }

            return !VerifyPassword(password, user.PasswordHash,user.PasswordSalt) ? null : user;
        }

        public async Task<UserModel> Register(UserModel user, string password)
        {
            CreatePasswordHash(password, out var passwordHash, out var passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            
            return user;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)){ 
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); // Create hash using password salt.
                for (var i = 0; i < computedHash.Length; i++){ // Loop through the byte array
                    if(computedHash[i] != passwordHash[i])
                    {
                        return false; // if mismatch
                    }
                }    
            }
            return true; //if no mismatches.
        }

        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.Username == username);
        }
    }
}