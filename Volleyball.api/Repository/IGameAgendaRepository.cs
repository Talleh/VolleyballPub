using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;

namespace Volleyball.api.Repository
{
    public interface IGameAgendaRepository : IRepository<GameAgenda>
    {
        GameAgenda GetBySchedule(Schedule schedule);
    }
}
