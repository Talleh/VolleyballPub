using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Services.GameRegistration
{
    public class ChecksProvider : IChecksProvider
    {
        private readonly IRegistrationServicesProvider _servicesProvider;

        public ChecksProvider(IRegistrationServicesProvider servicesProvider)
        {
            _servicesProvider = servicesProvider;
        }

        public IEnumerable<ICanRegisterCheck> Checks => GetChecks();

        private IEnumerable<ICanRegisterCheck> GetChecks()
        {
            var checks = new List<ICanRegisterCheck>
            {
                new GameDateRegisterCheck(_servicesProvider),
                new HallMemberRegisterCheck(_servicesProvider)
            };
            switch (_servicesProvider.PlayerStatus)
            {
                case PlayerStatus.Member:
                    checks.Add(new MemberSeatsRegisterCheck(_servicesProvider));
                    break;
                case PlayerStatus.SpecialGuest:
                    checks.Add(new SpecialGuestsRegisterCheck(_servicesProvider));
                    break;
            }
            return checks;
        }
    }
}
