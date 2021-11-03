using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Services.TaxCalculator
{
    public interface ITaxCalculatorServiceProvider
    {
        int PlayerId { get; set; }
        int GameId { get; set; }
        Game GetGame();
        Hall GetHall();
        HallTax GetHallTax();
        decimal GetPlayerAmount();

    }
}
