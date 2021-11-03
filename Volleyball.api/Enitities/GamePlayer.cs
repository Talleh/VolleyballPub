using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Enitities
{
    public class GamePlayer : IEntity, IRegisteredPlayer
    {
        public int Id { get; set; }
        public virtual Game Game {get;set;}
        public virtual Player Player { get; set; }
        public DateTime RegisterDate { get; set; }
        public PlayerStatus Status { get; set; }
        [NotMapped]
        public string Picture => Player.Picture;
        [NotMapped]
        public string Name => Player.Name;

        public bool Replaced { get; set; }
        [NotMapped]
        public int PlayerId => Player.Id;
    }
}
