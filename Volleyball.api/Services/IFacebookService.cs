using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Models;

namespace Volleyball.api.Services
{
    public interface IFacebookService
    {
        Task<FacebookUser> GetUser(string acceeToken);
    }
}
