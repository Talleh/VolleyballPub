using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository.Implementatios
{
    public class PlayerRepository : Repository<Player>, IPlayerRepository
    {
        public PlayerRepository(ApplicationDbContext context) : base(context)
        {
        }

        public Player GetCurrentByEmail(string email)
        {
            throw new NotImplementedException();
        }
    }
}
