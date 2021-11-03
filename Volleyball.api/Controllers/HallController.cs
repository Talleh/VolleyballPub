using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Facebook;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Volleyball.api.Enitities;
using Volleyball.api.Models;
using Volleyball.api.Repository;
using Volleyball.api.Services;

namespace Volleyball.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HallController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        private readonly IHallService _hallService;
        private readonly IGameService _gameService;
        private readonly IHallPlayerRepository _hallPlayerRepository;
        private readonly ITaxRepository _taxRepository;

        public HallController(IPlayerService playerService,
                              IHallService hallService,
                              IGameService gameService,
                              IHallPlayerRepository hallPlayerRepository,
                              ITaxRepository taxRepository)
        {
            _playerService = playerService;
            _hallService = hallService;
            _gameService = gameService;
            _hallPlayerRepository = hallPlayerRepository;
            _taxRepository = taxRepository;
        }

        [HttpPost]
        [Route("create")]
        public async Task<int> Create([FromBody] HallRegistrationModel model)
        {
            var admin = await _playerService.GetCurrentPlayer();
            model.Hall.Administrator = admin;
            var id = _hallService.Create(model);
            model.Tax.Hall = model.Hall;
            _taxRepository.AddOrUpdate(model.Tax);
            return id;
        }

        [HttpGet]
        public async Task<IEnumerable<Hall>> Get()
        { 
            var currentUser = await _playerService.GetCurrentPlayer();
            return _hallService.GetAdministratedHallsByUser(currentUser.Id);
        }

        [HttpGet]
        [Route("{id}")]
        public Hall Get(int id)
        {
            return _hallService.Get(id);
        }

        [HttpGet]
        [Route("{id}/hallPlayers")]
        public async Task <IEnumerable<HallPlayer>> GetHallPlayers(int id)
        {
            var currentUser = await _playerService.GetCurrentPlayer();
            return _hallService.GetHallPlayers(currentUser.Id, id);
        }

        [HttpGet]
        [Route("availableHalls")]
        [AllowAnonymous]
        public async Task<IEnumerable<Hall>> GetAvailableHalls()
        {
            var currentUser = await _playerService.GetCurrentPlayer();
            return _hallService.GetAvailableHallsFor(currentUser?.Id);
        }

        [HttpPut]
        [Route("status")]
        public void UpdatePlayerStatus(HallPlayer player)
        {
            _hallPlayerRepository.AddOrUpdate(player);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public void Delete(int id)
        {
            _hallService.Delete(id);
        }

        [HttpPost]
        [Route("addAgenda")]
        public void AddAgenda([FromBody] AddAgendaModel model)
        {
            var agenda = _hallService.AddAgenda(model);
            var createGames = agenda.Hall.CreateGamesAutomatically;
            if(createGames)
            _gameService.CreateGamesFrom(model.HallId, agenda);
        }

        [HttpDelete]
        [Route("deleteAgenda")]
        public void DeleteAgenda([FromBody] AddAgendaModel model)
        {
            var agendaId = _hallService.RemoveAgenda(model);
            _gameService.DeleteGamesFromHallAgenda(agendaId, model.HallId);
        }
    }
}
