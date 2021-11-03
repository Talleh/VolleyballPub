using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Enitities
{
    public class PrivateHallCode : IEntity
    {
        public int Id { get; set; }
        public string MemberCode { get; set; }
        public string SpecialGuestCode { get; set; }
        public int GuestReplacementHours { get; set; }
    }
}
