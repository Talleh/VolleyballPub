using System.Collections.Generic;

namespace Volleyball.api.Enitities
{
    public class Hall : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int MinPlayers { get; set; }
        public int MaxPlayers { get; set; }
        public bool IsPublic { get; set; } = true;
        public bool MemberSeatsLimited { get; set; } = true;
        public virtual PrivateHallCode Code { get; set; }
        public virtual Player Administrator { get; set; }
        public virtual IList<HallAgenda> Agendas { get; set; } = new List<HallAgenda>();
        public PlayerLevel PlayersLevel { get; set; }
        public bool CreateGamesAutomatically { get; set; }
    }
}
