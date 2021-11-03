using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository
{
    public interface IGamePlayerRepository : IRepository<IRegisteredPlayer>
    {
        void ReplaceLastGuest(Game game);
        void RestoreLastGuest(Game game);
    }
}
