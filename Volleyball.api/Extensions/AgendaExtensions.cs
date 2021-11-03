using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Extensions
{
    public static class AgendaExtensions
    {
        public static IEnumerable<DateTime> GetGameDatesForMonths(this HallAgenda agenda, int monthCount = 1)
        {
            var dates = new List<DateTime>();
            var firstGame = agenda.GameAgendas.Day.FirstGameInMonthFor();
            var lastGame = new DateTime(firstGame.Year, firstGame.Month + monthCount, 1);
            for (var gameDate = firstGame; gameDate < lastGame; gameDate = gameDate.AddDays(7))
                dates.Add(gameDate);
            return dates;
        }
    }
}
