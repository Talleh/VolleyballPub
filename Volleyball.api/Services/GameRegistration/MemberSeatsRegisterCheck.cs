using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;

namespace Volleyball.api.Services.GameRegistration
{
    public class MemberSeatsRegisterCheck : ICanRegisterCheck
    {
        private readonly IRegistrationServicesProvider _provider;
        public MemberSeatsRegisterCheck(IRegistrationServicesProvider provider)
        {
            _provider = provider;
        }

        public bool IsMandatory => false;

        public Task<bool> CanRegister()
        {
            var game = _provider.GetGame();
            var hall = game.Hall;
            if (!hall.MemberSeatsLimited) return Task.FromResult(true);

            var totalPlayersRegistered = game.AllPlayers.Count();
            if (totalPlayersRegistered < hall.MaxPlayers) return Task.FromResult(true);

            var totalMembersRegistered = game.AllPlayers.Count(x => x.Status == PlayerStatus.Member);
            var guestsCanBeReplaced = DateTime.UtcNow < game.Date.AddHours(-hall.Code?.GuestReplacementHours ?? 0);

            if (totalMembersRegistered < hall.MaxPlayers && guestsCanBeReplaced) return Task.FromResult(true);
            return Task.FromResult(false);
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
