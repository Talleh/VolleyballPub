using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository
{
    public interface IHallPlayerRepository : IRepository<HallPlayer>
    {
        IEnumerable<Hall> GetPlayerHalls(int playerId);
        IEnumerable<Hall> GetPlayerHalls(int playerId, PlayerStatus status);
        IEnumerable<HallPlayer> GetHallPlayers(int hallId);
        IEnumerable<HallPlayer> GetHallPlayers(int hallId, PlayerStatus status);
        bool PlayerSubscibed(int playerId, int hallId);
    }
}
