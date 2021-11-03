using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Enitities
{
    public class GameGuest : IEntity, IRegisteredPlayer
    {
        public int Id { get; set; }
        public virtual Game Game { get; set; }

        public string Name { get; set; }
        [NotMapped]
        public string Picture => string.Empty;

        public PlayerStatus Status => PlayerStatus.Guest;

        public DateTime RegisterDate { get; set; }
        public bool Replaced { get; set; }
        [NotMapped]
        public int PlayerId => Id;
    }
}
