using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository.Implementatios
{
    public class GameRepository : Repository<Game>, IGameRepository
    {
        private readonly DbSet<GamePlayer> _registrations;
        private readonly DbSet<GameGuest> _gameGuests;
        public GameRepository(ApplicationDbContext context) : base(context)
        {
            _registrations = context.Set<GamePlayer>();
            _gameGuests = context.Set<GameGuest>();
        }

        public void AddGuest(int gameId, GameGuest guest)
        {
            var game = Get(gameId);
            game.Guests.Add(guest);
            AddOrUpdate(game);
        }

        public void DeleteRegistration(int registrationId)
        {
            var registartion = _registrations.Find(registrationId);
            if (registartion != null)
            {
                registartion.Replaced = true;
                _registrations.Update(registartion);
                SaveChanges();
            }
        }

        public IEnumerable<Game> GetGamesForHalls(params int[] hallId)
        {
            return Get(x => hallId.Contains(x.Hall.Id));
        }

        public void RemoveGuest(int guestId)
        {
            var guest = _gameGuests.Find(guestId);
            guest.Replaced = true;
            _gameGuests.Update(guest);
            SaveChanges();
        }
    }
}
