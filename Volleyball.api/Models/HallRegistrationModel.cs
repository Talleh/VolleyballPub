using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Models
{
    public class HallRegistrationModel
    {
        public Hall Hall { get; set; }
        public HallTax Tax { get; set; }
    }
}
