using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Enitities
{
    public class HallAgenda : IEntity
    {
        public int Id { get; set; }
        public virtual Hall Hall { get; set; }
        public virtual GameAgenda GameAgendas { get; set; }
    }
}
