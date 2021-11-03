using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Models;

namespace Volleyball.api.Services.GameRegistration
{
    public class GameDateRegisterCheck : ICanRegisterCheck
    {
        private readonly IRegistrationServicesProvider _provider;
        public GameDateRegisterCheck(IRegistrationServicesProvider provider)
        {
            _provider = provider;
        }

        public bool IsMandatory => true;

        public Task<bool> CanRegister()
        {
            var game = _provider.GetGame();
            return Task.FromResult(game.Date > DateTime.UtcNow);
        }

        public Task<bool> CanUnRegister()
        {
            return CanRegister();
        }
    }
}
