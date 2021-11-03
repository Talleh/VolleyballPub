using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository
{
    public interface ITaxRepository : IRepository<HallTax>
    {
        HallTax GetHallTax(int hallId);
    }
}
