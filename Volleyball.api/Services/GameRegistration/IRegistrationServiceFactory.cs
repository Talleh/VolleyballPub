using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;

namespace Volleyball.api.Services.GameRegistration
{
    public interface IRegistrationServiceFactory
    {
        IRegistrationService GetService(GameRegisterModel model);
    }
}
