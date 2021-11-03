using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Volleyball.api.Authorization.Requirements;
using Volleyball.api.Enitities;
using Volleyball.api.Models;
using Volleyball.api.Services;
using Volleyball.api.Services.GameRegistration;
using Volleyball.api.Services.TaxCalculator;

namespace Volleyball.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;
        private readonly IPlayerService _playerService;
        private readonly IAuthorizationService _authorizationService;
        private readonly ITaxCalculatorFactory _taxCalculatorFactory;
        private readonly IRegistrationServiceFactory _registrationService;
        public GameController(IGameService gameService,
                              IAuthorizationService authorizationService,
                              IPlayerService playerService,
                              ITaxCalculatorFactory taxCalculatorFactory,
                              IRegistrationServiceFactory registrationService)
        {
            _gameService = gameService;
            _authorizationService = authorizationService;
            _playerService = playerService;
            _taxCalculatorFactory = taxCalculatorFactory;
            _registrationService = registrationService;
        }

        [HttpPost]
        [Route("register")]
        public Task Register([FromBody] GameRegisterModel model)
        {
            return ModifyGamePlayers(model, _gameService.Register);
        }

        [HttpGet]
        [Route("{gameId}/gamePlayers")]
        public async Task<IEnumerable<IRegisteredPlayer>> GetGamePlayers(int gameId, [FromQuery] string filter)
        {
            var player = await _playerService.GetCurrentPlayer();
            var game = _gameService.Get(gameId, player.Id);
            if (game == null) return Enumerable.Empty<IRegisteredPlayer>();
            return game.AllPlayers.Where(x => x.Name.ToLower().Contains(filter.ToLower()));
        }



        [HttpGet("{gameId}/tax")]
        [AllowAnonymous]
        public async Task<decimal> GetTaxFor(int gameId)
        {
            var player = await _playerService.GetCurrentPlayer();
            var taxCalculator = _taxCalculatorFactory.GetTaxCalculator(player?.Id, gameId);
            var tax = taxCalculator.GetTax();
            return tax > 0 ? tax : 0;
        }

        [HttpGet]
        [Route("{gameId}/freePlayers")]
        public async Task<IEnumerable<IRegisteredPlayer>> GetFreePlayers(int gameId, [FromQuery] string filter)
        {
            var player = await _playerService.GetCurrentPlayer();
            var game = _gameService.Get(gameId, player.Id);
            if (game == null) return Enumerable.Empty<IRegisteredPlayer>();
            return _playerService.GetFreePlayersFor(game, filter);
        }

        [HttpPost]
        [Route("unregister")]
        public Task Unregister([FromBody] GameRegisterModel model)
        {
            return ModifyGamePlayers(model, _gameService.Unregister);
        }

        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<Game> Get([FromQuery] int? hallId, [FromQuery] DateTime tillDate, [FromQuery] int? playerId)
        {
            if (hallId.HasValue)
                return _gameService.GetHallGamesTillDate(hallId.Value, tillDate, playerId);
            return _gameService.GetGamesTillDate(tillDate, playerId);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id}")]
        public async Task<Game> Get(int id)
        {
            var player = await _playerService.GetCurrentPlayer();
            return _gameService.Get(id, player?.Id);
        }

        [HttpGet]
        [Route("{id}/canRegister")]
        public async Task<bool> CanRegister(int id)
        {
            var player = await _playerService.GetCurrentPlayer();
            var registerModel = new GameRegisterModel
            {
                GameId = id,
                PlayerId = player.Id
            };
            return await _registrationService.GetService(registerModel).CanRegister();
        }

        private async Task<IActionResult> ModifyGamePlayers(GameRegisterModel model, Action<GameRegisterModel> action)
        {
            var requirement = new CanEditGamePlayersList();
            var authorize = await _authorizationService.AuthorizeAsync(User, model, requirement);
            if (authorize.Succeeded)
            {
                action(model);
                return Ok();
            }
            return Forbid();
        }
    }
}
