using System;
using System.Threading.Tasks;
using Example.API.Constants;
using Example.API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Example.API.Dtos;
using Example.API.Models.User;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Cors;

namespace Example.API.Controllers.Users
{
    [ApiController]
    [Route(ControllerConstants.UserControllerRoute)]
    [EnableCors("ClientPermission")]
    public class UserController : ControllerBase
    {
        #region MEMBERS

        private readonly IUserRepository _repo;
        private readonly ILogger<UserController> _logger;
        private readonly IConfiguration _config;


        #endregion MEMBERS

        #region CONSTRUCTOR
        public UserController(IUserRepository repo, ILogger<UserController> logger, IConfiguration config) {
            _repo = repo;
            _logger = logger;
            _config = config;
        }

        #endregion CONSTRUCTOR

        #region ROUTES

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto) {

            _logger.LogInformation($"(User creation) user creation requested => '{userForRegisterDto.Username}'");


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            #pragma warning disable CA1304 // Spécifier CultureInfo
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Username))
            {
                return BadRequest("Username is already taken");
            }

            var userToCreate = new UserModel {
                Username = userForRegisterDto.Username,
            };
            _ = await _repo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userForRegisterDto)
        {
            var userFromRepo = await _repo.Login(userForRegisterDto.Username.ToLower(), userForRegisterDto.Password);
            #pragma warning restore CA1304 // Spécifier CultureInfo

            if (userFromRepo == null) // User login failed
            {
                return Unauthorized();
            }

            // generate Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:Token").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.Username)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { tokenString });
        }

        #endregion ROUTES
        
    }
}