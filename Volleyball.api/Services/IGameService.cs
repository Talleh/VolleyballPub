using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;

namespace Volleyball.api.Services
{
    public interface IGameService
    {
        void Register(GameRegisterModel model);
        void Unregister(GameRegisterModel model);

        void RemoveGame(int gameId);
        void DeleteGamesFromHallAgenda(int agendaId, int hallId);

        void CreateGamesFrom(int hallId, HallAgenda agenda);
        IEnumerable<Game> GetGamesTillDate(DateTime date, int? playerId);
        Game Get(int id, int? playerId);
        IEnumerable<Game> GetHallGamesTillDate(int hallId, DateTime date, int? playerId);

    }
}
