using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;
using Volleyball.api.Repository;

namespace Volleyball.api.Services.GameRegistration
{
    public class RegistrationServiceFactory : IRegistrationServiceFactory
    {
        private readonly IRegistrationServicesProvider _servicesProvider;
        private readonly IChecksProvider _checksProvider;
        public RegistrationServiceFactory(IRegistrationServicesProvider servicesProvider, IChecksProvider checksProvider)
        {
            _servicesProvider = servicesProvider;
            _checksProvider = checksProvider;
        }

        public IRegistrationService GetService(GameRegisterModel model)
        {
            _servicesProvider.Model = model;
            return _servicesProvider.PlayerStatus switch
            {
                PlayerStatus.Member => new MemberRegistrationService(_servicesProvider, _checksProvider),
                PlayerStatus.Guest => new GuestRegistrationService(_servicesProvider, _checksProvider),
                PlayerStatus.SpecialGuest => new SpecialGuestRegistartionService(_servicesProvider, _checksProvider),
                _ => throw new NotImplementedException("Registration Service")
            };
        }
    }
}
