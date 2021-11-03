using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository
{
    public interface IPlayerRepository : IRepository<Player>
    {
        Player GetCurrentByEmail(string email);
    }
}
