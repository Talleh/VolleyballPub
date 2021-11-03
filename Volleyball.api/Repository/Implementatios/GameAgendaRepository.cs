using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;

namespace Volleyball.api.Repository.Implementatios
{
    public class GameAgendaRepository : Repository<GameAgenda>, IGameAgendaRepository
    {
        public GameAgendaRepository(ApplicationDbContext context) : base(context)
        {
        }

        public GameAgenda GetBySchedule(Schedule schedule)
        {
            var agenda = Get(x => x.Day == schedule.Day && x.Start == schedule.Start && x.End == schedule.End).FirstOrDefault();
            if (agenda != null) return agenda;
            agenda = new GameAgenda
            {
                Day = schedule.Day,
                Start = schedule.Start,
                End = schedule.End
            };
            AddOrUpdate(agenda);
            return agenda;
        }
    }
}
