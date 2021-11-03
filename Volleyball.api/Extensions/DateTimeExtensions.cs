using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Extensions
{
    public static class DateTimeExtensions
    {
        public static int GamesInMonth(this DayOfWeek day)
        {
            var gamesInMonth = 0;
            var firstGameDate = FirstGameInMonthFor(day);
            for (var step = firstGameDate; step.Month == firstGameDate.Month; step = step.AddDays(7))
                gamesInMonth++;

            return gamesInMonth;
        }

        public static DateTime FirstGameInMonthFor(this DayOfWeek day)
        {
            var start = 1;
            var startOfMonth = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, start);
            
            
            while (startOfMonth.DayOfWeek != day)
                startOfMonth = startOfMonth.AddDays(start);

            return new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, start);
        }
    }
}
