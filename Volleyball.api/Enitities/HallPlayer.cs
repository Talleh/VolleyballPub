using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Enitities
{
    public class HallPlayer : IEntity
    {
        public int Id { get; set; }
        public virtual Player Player { get; set; }
        public virtual Hall Hall { get; set; }
        public PlayerStatus Status { get; set; }
    }
}
