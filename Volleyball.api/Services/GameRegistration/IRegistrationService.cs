using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Models;

namespace Volleyball.api.Services.GameRegistration
{
    public interface IRegistrationService
    {
        Task<bool> CanRegister();
        Task<bool> CanUnregister();
        void Register();
        void UnRegister();
    }
}
