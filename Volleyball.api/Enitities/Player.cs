using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Enitities
{
    public class Player : IdentityUser<int>, IEntity
    {
        public string Picture { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public PlayerLevel Level { get; set; }

        [NotMapped]
        public string Name => string.Join(' ', FirstName, LastName);
    }
}
