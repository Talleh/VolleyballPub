using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;
using Volleyball.api.Repository;

namespace Volleyball.api.Services.GameRegistration
{
    public class MemberRegistrationService : SpecialGuestRegistartionService, IRegistrationService
    {
        public MemberRegistrationService(IRegistrationServicesProvider servicesProvider, IChecksProvider checksProvider) :
            base(servicesProvider, checksProvider)
        {
        }

        public override void Register()
        {
            base.Register();
            var game = provider.GetGame();
            provider.GamePlayerRepository.ReplaceLastGuest(game);
        }

        public override void UnRegister()
        {
            base.UnRegister();
            var game = provider.GetGame();
            provider.GamePlayerRepository.RestoreLastGuest(game);
        }
    }
}
