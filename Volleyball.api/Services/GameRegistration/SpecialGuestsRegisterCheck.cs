using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Models;

namespace Volleyball.api.Services.GameRegistration
{
    public class SpecialGuestsRegisterCheck : ICanRegisterCheck
    {
        private readonly IRegistrationServicesProvider _provider;

        public SpecialGuestsRegisterCheck(IRegistrationServicesProvider provider)
        {
            _provider = provider;
        }

        public bool IsMandatory => false;

        public async Task<bool> CanRegister()
        {
            var game = _provider.GetGame();
            if (game == null) return false;

            var seatsAreAvaliable = game.AllPlayers.Count() < game.Hall.MaxPlayers;
            var currentPlayer = await _provider.PlayerService.GetCurrentPlayer();

            return seatsAreAvaliable && currentPlayer.Id == _provider.Model.PlayerId;
        }

        public async Task<bool> CanUnRegister()
        {
            var currentUser = await _provider.PlayerService.GetCurrentPlayer();
            var game = _provider.GetGame();
            var hall = game.Hall;
            if (currentUser.Id == hall.Administrator.Id) return true;
            return game.AllPlayers.Any(x => x.PlayerId == _provider.Model.PlayerId);
        }
    }
}
