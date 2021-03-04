using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Example.API.Models.User
{
    public sealed class UserCreationModel
    {
        #region FIELDS

        public string Username { get; set; }

        [Required]
        [JsonRequired]
        public string Password { get; set; }

        #endregion FIELDS
    }
}