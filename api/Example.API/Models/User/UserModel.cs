using System;
using System.Collections.Generic;

namespace Example.API.Models.User
{
    public class UserModel
    {
        public UserModel() {
            Id = Guid.NewGuid();
        }

        public Guid Id {get; set;} 
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt {get; set; }
        public List<string> ApiEndPoint { get; set;}
    }
}