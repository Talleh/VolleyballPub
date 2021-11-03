using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository.Implementatios
{
    public class HallPlayerRepository : Repository<HallPlayer>, IHallPlayerRepository
    {
        public HallPlayerRepository(ApplicationDbContext context) : base(context)
        {
        }

        public IEnumerable<HallPlayer> GetHallPlayers(int hallId)
        {
            return Get(x => x.Hall.Id == hallId);
        }

        public IEnumerable<HallPlayer> GetHallPlayers(int hallId, PlayerStatus status)
        {
            return Get(x => x.Hall.Id == hallId && x.Status == status);
        }

        public IEnumerable<Hall> GetPlayerHalls(int playerId)
        {
            return Get(x => x.Player.Id == playerId).Select(x => x.Hall);
        }

        public IEnumerable<Hall> GetPlayerHalls(int playerId, PlayerStatus status)
        {
            return Get(x => x.Player.Id == playerId && x.Status == status).Select(x => x.Hall);
        }

        public bool PlayerSubscibed(int playerId, int hallId)
        {
            return GetHallPlayers(hallId, PlayerStatus.Member).Any(x => x.Player.Id == playerId);
        }
    }
}
