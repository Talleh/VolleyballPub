using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Extensions;
using Volleyball.api.Repository;

namespace Volleyball.api.Services.TaxCalculator
{
    public class SubscriptionDynamicTaxCalculator : ITaxCalculator
    {
        private readonly ITaxCalculatorServiceProvider _provider;
        private readonly IHallPlayerRepository _hallPlayerRepository;
        public SubscriptionDynamicTaxCalculator(ITaxCalculatorServiceProvider provider, IHallPlayerRepository hallPlayerRepository)
        {
            _provider = provider;
            _hallPlayerRepository = hallPlayerRepository;
        }

        public decimal GetTax()
        {
            
            var hall = _provider.GetHall();
            var hallTax = _provider.GetHallTax();
            var playerAmount = _provider.GetPlayerAmount();
            var subscibers = _hallPlayerRepository.GetHallPlayers(hall.Id, PlayerStatus.Member);
            var currentSubscribersCount = subscibers.Count();
            var totalSubscribersCount = subscibers.Any(p => p.Id == _provider.PlayerId) ? currentSubscribersCount
                                                                                  : currentSubscribersCount + 1;
            var monthRent = hallTax.MonthRentTax ?? GetMonthRentFromAgenda(hall.Agendas.Select(x => x.GameAgendas), hallTax.GameRentTax);
            var taxForGame = Math.Floor(monthRent / totalSubscribersCount);
            return taxForGame - playerAmount;
        }

        private decimal GetMonthRentFromAgenda(IEnumerable<GameAgenda> gamesAgenda, decimal gameRentTax)
        {
            var gamesInMonth = 0;
            foreach (var agenda in gamesAgenda)
                gamesInMonth += agenda.Day.GamesInMonth();
            return gameRentTax * gamesInMonth;
        }
    }
}
