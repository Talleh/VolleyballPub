using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;

namespace Volleyball.api.Services
{
    public interface IAccountService
    {
        Task Supply(int accountId, decimal amount);
        Task Withdraw(int accountId, decimal amount);
        Task Supply(PlayerAccountDto account);
        Task Withdraw(PlayerAccountDto account);
        PlayerAccount Get(PlayerAccountDto account);
    }
}
