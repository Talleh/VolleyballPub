using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Models
{
    public class FacebookUser
    {
        private string _email;
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email
        {
            get => _email ?? FirstName + LastName + "@facebook.com";
            set => _email = value;
        }
        public string Picture { get; set; }

        public Player ConvertToDomainUser()
        {
            return new Player
            {
                Email = Email,
                UserName = Email,
                Picture = Picture,
                EmailConfirmed = true,
                FirstName = FirstName,
                LastName = LastName
            };
        }
    }
}
