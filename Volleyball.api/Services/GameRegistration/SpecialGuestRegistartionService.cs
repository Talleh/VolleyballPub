using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Services.GameRegistration
{
    public class SpecialGuestRegistartionService : BaseRegistrationService, IRegistrationService
    {
        public SpecialGuestRegistartionService(IRegistrationServicesProvider provider, IChecksProvider checksProvider) :
            base(provider, checksProvider) { }

        public override void Register()
        {
            var game = provider.GetGame();
            provider.GamePlayerRepository.AddOrUpdate(new GamePlayer
            {
                Game = game,
                Player = provider.PlayerService.GetById(provider.Model.PlayerId ?? -1),
                RegisterDate = DateTime.UtcNow,
                Status = provider.PlayerStatus
            });
        }

        public override void UnRegister()
        {
            var game = provider.GetGame();
            var gamePlayer = game.AllPlayers.FirstOrDefault(x => x.PlayerId == provider.Model.PlayerId);
            provider.GamePlayerRepository.Remove(gamePlayer.Id);
        }
    }
}
