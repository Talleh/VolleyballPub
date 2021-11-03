using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Services.GameRegistration;

namespace Volleyball.api.Models
{
    public class GameRegisterModel
    {
        public int? PlayerId { get; set; }
        public int GameId { get; set; }
        public string Name { get; set; }
        public bool PlayerValid => PlayerId.HasValue || !string.IsNullOrEmpty(Name);
    }
}
