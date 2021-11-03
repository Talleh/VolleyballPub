using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Services.TaxCalculator
{
    public class RegularDynamicTaxCalculator : ITaxCalculator
    {
        private readonly ITaxCalculatorServiceProvider _provider;
        public RegularDynamicTaxCalculator(ITaxCalculatorServiceProvider provider)
        {
            _provider = provider;
        }

        public decimal GetTax()
        {
            var game =  _provider.GetGame();
            var hallTax =  _provider.GetHallTax();
            var playerAmount =  _provider.GetPlayerAmount();
            var registeredPlayersCount = game.Players.Count;
            var playersCount = game.Players.Any(p => p.Player.Id == _provider.PlayerId) ? registeredPlayersCount
                                                                                 : registeredPlayersCount + 1;
            var taxForGame = Math.Floor(hallTax.GameRentTax / playersCount);
            return taxForGame - playerAmount;
        }
    }
}
