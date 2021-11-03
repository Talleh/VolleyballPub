using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Repository;

namespace Volleyball.api.Services.TaxCalculator
{
    public class TaxCalculatorFactory : ITaxCalculatorFactory
    {
        private readonly ITaxCalculatorServiceProvider _provider;
        private readonly IHallPlayerRepository _hallPlayerRepository;
        public TaxCalculatorFactory(ITaxCalculatorServiceProvider provider, IHallPlayerRepository hallPlayerRepository)
        {
            _provider = provider;
            _hallPlayerRepository = hallPlayerRepository;
        }

        public ITaxCalculator GetTaxCalculator(int? playerId, int gameId)
        {
            _provider.PlayerId = playerId ?? -1;
            _provider.GameId = gameId;

            var hall = _provider.GetHall();
            var hallTax = _provider.GetHallTax();
            var playerIsSubscribed = playerId.HasValue && !hall.IsPublic && _hallPlayerRepository.PlayerSubscibed(playerId.Value, hall.Id);
            if (playerIsSubscribed && hallTax.IsMemberTaxDinamic)
                return new SubscriptionDynamicTaxCalculator(_provider, _hallPlayerRepository);
            if (playerIsSubscribed)
                return new SubscriptionTaxCalculator(_provider);
            if (hallTax.IsRegularTaxDinamic)
                return new RegularDynamicTaxCalculator(_provider);

            return new RegularTaxCalculator(_provider);
        }
    }
}
