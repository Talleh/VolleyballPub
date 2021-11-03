using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Services.TaxCalculator
{
    public class RegularTaxCalculator : ITaxCalculator
    {
        private readonly ITaxCalculatorServiceProvider _provider;
        public RegularTaxCalculator(ITaxCalculatorServiceProvider provider)
        {
            _provider = provider;
        }

        public decimal GetTax()
        {
            var hallTax =  _provider.GetHallTax();
            var playerAmount =  _provider.GetPlayerAmount();
            return hallTax.RegularPlayerTax - playerAmount;
        }
    }
}
