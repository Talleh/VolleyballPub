using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Models
{
    public class RegisterToHallModel
    {
        public int HallId { get; set; }
        public int PlayerId { get; set; }
        public string Code { get; set; }
        public PlayerStatus Status { get; set; }
    }
}
