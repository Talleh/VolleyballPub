using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Enitities
{
    public enum PlayerStatus : int
    {
        Guest = 0,
        Member = 1,
        SpecialGuest = 2,
        Blocked = 3
    }
}
