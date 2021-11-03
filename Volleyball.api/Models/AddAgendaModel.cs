using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Models
{
    public class AddAgendaModel
    {
        public int HallId { get; set; }
        public Schedule Schedule { get; set; }
    }

    public class Schedule
    {
        public DayOfWeek Day { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
    }
}
