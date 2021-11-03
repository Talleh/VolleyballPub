using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Models
{
    public class PlayerAccountDto
    {
        public int PlayerId { get; set; }
        public int HallId { get; set; }
        public decimal Amount { get; set; }
    }
}
