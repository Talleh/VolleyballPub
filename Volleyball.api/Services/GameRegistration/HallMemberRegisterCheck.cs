using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Models;

namespace Volleyball.api.Services.GameRegistration
{
    public class HallMemberRegisterCheck : ICanRegisterCheck
    {
        private readonly IRegistrationServicesProvider _provider;

        public HallMemberRegisterCheck(IRegistrationServicesProvider provider)
        {
            _provider = provider;
        }

        public bool IsMandatory => true;

        public async Task<bool> CanRegister()
        {
            var currentUser = await _provider.PlayerService.GetCurrentPlayer();
            var hall = _provider.GetGame().Hall;
            if (currentUser.Id == hall.Administrator.Id) return true;
            var isBlocked = _provider.PlayerBlocked();
            if (isBlocked)
                return false;
            var isMemberOfHall = _provider.IsMemberOfHall();
            if (!hall.IsPublic && !isMemberOfHall) return false;

            return true;
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
