using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Extensions;
using Volleyball.api.Models;
using Volleyball.api.Repository;
using Volleyball.api.Services.GameRegistration;

namespace Volleyball.api.Services.Implementations
{
    public class GameService : IGameService
    {
        private readonly IGameRepository _gameRepository;
        private readonly IHallRepository _hallRepository;
        private readonly IHallPlayerRepository _hallPlayerRepository;
        private readonly IRegistrationServiceFactory _registrationServiceFactory;
        public GameService(IGameRepository gameRepository, IHallRepository hallRepository,
            IRegistrationServiceFactory registrationServiceFactory, IHallPlayerRepository hallPlayerRepository)
        {
            _gameRepository = gameRepository;
            _hallRepository = hallRepository;
            _registrationServiceFactory = registrationServiceFactory;
            _hallPlayerRepository = hallPlayerRepository;
        }

        public void CreateGamesFrom(int hallId, HallAgenda agenda)
        {
            var hall = _hallRepository.Get(hallId);
            var games = agenda.GetGameDatesForMonths(3).Select(x => new Game
            {
                Agenda = agenda.GameAgendas,
                Date = x,
                Hall = hall
            });
            _gameRepository.AddOrUpdateRange(games);
        }

        public IEnumerable<Game> GetHallGamesTillDate(int hallId, DateTime date, int? playerId)
        {
            return GetGamesTillDate(date, playerId).Where(x => x.Hall.Id == hallId);
        }

        public IEnumerable<Game> GetGamesTillDate(DateTime date, int? playerId)
        {
            RefreshGamesList();
            var hallIdsPlayerIsMemberOf = _hallPlayerRepository.Get(x => x.Player.Id == playerId).Select(x => x.Id);
            var games = _gameRepository.Get(x => PlayerCanViewGame(x, date, playerId, hallIdsPlayerIsMemberOf));
            return games;
        }

        public void Register(GameRegisterModel model)
        {
             _registrationServiceFactory.GetService(model).Register();
        }

        public void Unregister(GameRegisterModel model)
        {
            _registrationServiceFactory.GetService(model).UnRegister();
        }

        public void RemoveGame(int gameId)
        {
            _gameRepository.Remove(gameId);
        }

        public Game Get(int id, int? playerId)
        {
            var game = _gameRepository.Get(id);
            var hallIdsPlayerIsMemberOf = _hallPlayerRepository.Get(x => x.Player.Id == playerId).Select(x => x.Id);
            if (PlayerCanViewGame(game, DateTime.UtcNow, playerId, hallIdsPlayerIsMemberOf))
                return game;
            return null;
        }

        public void DeleteGamesFromHallAgenda(int agendaId, int hallId)
        {
            var games = _gameRepository.Get(x => x.Agenda.Id == agendaId && x.Hall.Id == hallId);
            _gameRepository.RemoveRange(games);
        }

        private bool PlayerCanViewGame(Game game, DateTime date, int? playerId, IEnumerable<int> hallIdsPlayerIsMemberOf)
        {
            if (game.Hall.IsPublic) return game.Date < date || game.Hall.Administrator.Id == playerId;
            if (!playerId.HasValue) return false;
            return hallIdsPlayerIsMemberOf.Contains(game.Hall.Id);
        }

        private void RefreshGamesList()
        {
            var oldGames = _gameRepository.Get(x => x.Date < DateTime.UtcNow.AddDays(-1));
            if (!oldGames.Any()) return;

            var newGames = oldGames.Where(x => x.Hall.CreateGamesAutomatically).Select(x => new Game
            {
                Hall = x.Hall,
                Agenda = x.Agenda,
                Date = x.Date.AddDays(7)
            });
            _gameRepository.RemoveRange(oldGames);
            _gameRepository.AddOrUpdateRange(newGames);
        }
    }
}
