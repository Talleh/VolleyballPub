using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository
{
    public interface IHallRepository : IRepository<Hall>
    {
        Hall GetGameHall(int gameId);
        HallAgenda AddAgenda(int hallId, GameAgenda agenda);
        void RemoveAgenda(int hallId, int gameAgendaId);
    }
}
