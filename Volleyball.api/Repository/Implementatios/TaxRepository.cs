using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository.Implementatios
{
    public class TaxRepository : Repository<HallTax>, ITaxRepository
    {
        public TaxRepository(ApplicationDbContext context) : base(context)
        {
        }

        public HallTax GetHallTax(int hallId)
        {
            return Find(x => x.Hall.Id == hallId);
        }
    }
}
