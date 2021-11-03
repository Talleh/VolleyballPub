using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;

namespace Volleyball.api.Services
{
    public interface IPlayerService
    {
        Task<Player> GetCurrentPlayer();
        Player GetById(int playerId);
        Task RequestSubscription(int playerId, int hallId);
        Task ProcessSubsciptionRequest(HallPlayer subscription);
        IEnumerable<IRegisteredPlayer> GetFreePlayersFor(Game game, string nameContains);
    }
}
