using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Services;

namespace Volleyball.api.Enitities
{
    public class GameAgenda : IEntity
    {
        public int Id { get; set; }
        public DayOfWeek Day { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
    }
}
