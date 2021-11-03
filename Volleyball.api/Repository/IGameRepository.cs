using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository
{
    public interface IGameRepository : IRepository<Game>
    {
        IEnumerable<Game> GetGamesForHalls(params int[] hallId);
        void DeleteRegistration(int registartionId);
        void AddGuest(int gameId, GameGuest guest);
        void RemoveGuest(int guestId);
    }
}
