using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository.Implementatios
{
    public class GamePlayerRepository : Repository<IRegisteredPlayer>, IGamePlayerRepository
    {
        public GamePlayerRepository(ApplicationDbContext context) : base(context) { }

        public void ReplaceLastGuest(Game game)
        {
            var needToReplace = game.Hall.MaxPlayers < game.AllPlayers.Count();
            if (!needToReplace) return;
            var lastGuest = game.AllPlayers
                                .Where(x => x.Status == (PlayerStatus.Guest | PlayerStatus.SpecialGuest))
                                .OrderByDescending(x => x.RegisterDate).FirstOrDefault();
            if (lastGuest == null) return;
            lastGuest.Replaced = true;
            AddOrUpdate(lastGuest);
        }

        public void RestoreLastGuest(Game game)
        {
            var needToRestore = game.Hall.MaxPlayers - 1 > game.AllPlayers.Count();
            if (!needToRestore) return;
            var firstReplacedGuest = game.PlayersArhive.OrderBy(x => x.RegisterDate).FirstOrDefault();
            if (firstReplacedGuest == null) return;
            firstReplacedGuest.Replaced = false;
            AddOrUpdate(firstReplacedGuest);
        }
    }
}
