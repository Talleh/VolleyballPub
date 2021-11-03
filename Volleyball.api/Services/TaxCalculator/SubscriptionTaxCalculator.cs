using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Services.TaxCalculator
{
    public class SubscriptionTaxCalculator : ITaxCalculator
    {
        private readonly ITaxCalculatorServiceProvider _provider;
        public SubscriptionTaxCalculator(ITaxCalculatorServiceProvider provider)
        {
            _provider = provider;
        }

        public decimal GetTax()
        {
            var hallTax = _provider.GetHallTax();
            var accountAmount = _provider.GetPlayerAmount();
            return hallTax.MemberPlayerTax - accountAmount;
        }
    }
}
