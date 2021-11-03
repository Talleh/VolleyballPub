using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Enitities
{
    public class Game : IEntity
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public virtual GameAgenda Agenda { get; set; }
        public virtual Hall Hall { get; set; }
        public virtual IList<GamePlayer> Players { get; set; } = new List<GamePlayer>();
        public virtual IList<GameGuest> Guests { get; set; } = new List<GameGuest>();
        [NotMapped]
        public IEnumerable<IRegisteredPlayer> AllPlayers => Players.Where(x => !x.Replaced).Concat<IRegisteredPlayer>(Guests.Where(x => !x.Replaced));
        [NotMapped]
        public IEnumerable<IRegisteredPlayer> PlayersArhive => Players.Where(x => x.Replaced).Concat<IRegisteredPlayer>(Guests.Where(x => x.Replaced));
    }
}
