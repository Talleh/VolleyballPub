using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;
using Volleyball.api.Repository;

namespace Volleyball.api.Services.GameRegistration
{
    public class GuestRegistrationService : BaseRegistrationService, IRegistrationService
    {
        public GuestRegistrationService(IRegistrationServicesProvider servicesProvider, IChecksProvider checksProvider) :
            base(servicesProvider, checksProvider)
        {
        }

        public override void Register()
        {
            var game = provider.GetGame();
            provider.GamePlayerRepository.AddOrUpdate(new GameGuest
            {
                Name = provider.Model.Name,
                RegisterDate = DateTime.UtcNow,
                Game = game
            });
        }

        public override void UnRegister()
        {
            var game = provider.GetGame();
            var guest = game.Guests.FirstOrDefault(x => x.Name == provider.Model.Name);
            provider.GamePlayerRepository.Remove(guest.Id);
        }
    }
}
