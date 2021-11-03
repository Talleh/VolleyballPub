using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;
using Volleyball.api.Repository;

namespace Volleyball.api.Services.Implementations
{
    public class PlayerService : IPlayerService
    {
        private readonly UserManager<Player> _userManager;
        private readonly IHttpContextAccessor _httpAccessor;
        private readonly IPlayerRepository _playerRepository;

        public PlayerService(UserManager<Player> userManager, IHttpContextAccessor httpContextAccessor, IPlayerRepository playerRepository)
        {
            _userManager = userManager;
            _httpAccessor = httpContextAccessor;
            _playerRepository = playerRepository;
        }

        public Player GetById(int playerId)
        {
            return _playerRepository.Get(playerId);
        }

        public Task<Player> GetCurrentPlayer()
        {
            if (_httpAccessor.HttpContext.User == null) return null;
            var email = _httpAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
            if (string.IsNullOrEmpty(email))
                throw new InvalidOperationException("User does not exists");
            return _userManager.FindByEmailAsync(email);
        }

        public IEnumerable<IRegisteredPlayer> GetFreePlayersFor(Game game, string nameContains)
        {
            var freePlayers = _playerRepository.Get(x => !game.Players
                                                              .Any(x => x.PlayerId == x.Id &&
                                                                        x.Name.ToLower().Contains(nameContains.ToLower())));
            return freePlayers.Select(x => new GamePlayer
            {
                Game = game,
                Player = x,
                Status = PlayerStatus.SpecialGuest
            });
        }

        public Task ProcessSubsciptionRequest(HallPlayer subscription)
        {
            throw new NotImplementedException();
        }

        public Task RequestSubscription(int playerId, int hallId)
        {
            throw new NotImplementedException();
        }
    }
}
