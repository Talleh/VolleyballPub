using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository.Implementatios
{
    public class HallRepository : Repository<Hall>, IHallRepository
    {
        private readonly DbSet<HallAgenda> _hallAgendas;
        public HallRepository(ApplicationDbContext context) : base(context)
        {
            _hallAgendas = context.Set<HallAgenda>();
        }

        public HallAgenda AddAgenda(int hallId, GameAgenda agenda)
        {
            var hall = Get(hallId);
            if (hall == null)
                throw new ArgumentNullException("No hall found");

            var hallAgenda = new HallAgenda
            {
                Hall = hall,
                GameAgendas = agenda
            };
            hall.Agendas.Add(hallAgenda);
            AddOrUpdate(hall);

            return hallAgenda;
        }

        public Hall GetGameHall(int gameId)
        {
            throw new NotImplementedException();
        }

        public void RemoveAgenda(int hallId, int gameAgendaId)
        {
            var hall = Get(hallId);
            var hallAgenda = hall.Agendas.FirstOrDefault(x => x.GameAgendas.Id == gameAgendaId);
            _hallAgendas.Remove(hallAgenda);
            SaveChanges();
        }
    }
}
