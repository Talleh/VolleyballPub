using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository.Implementatios
{
    public class AccountRepository : Repository<PlayerAccount>, IAccountRepository
    {
        public AccountRepository(ApplicationDbContext context) : base(context)
        {
        }

        public PlayerAccount Get(int playerId, int hallId)
        {
            return Find(x => x.Player.Id == playerId && x.Hall.Id == hallId);
        }
    }
}
