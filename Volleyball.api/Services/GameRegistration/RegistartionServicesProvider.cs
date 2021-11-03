using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;
using Volleyball.api.Repository;

namespace Volleyball.api.Services.GameRegistration
{
    public class RegistartionServicesProvider : IRegistrationServicesProvider
    {
        private readonly IHallPlayerRepository _hallPlayerRepository;
        private readonly IGameRepository _gameRepository;
        private bool _statusLoaded;
        private PlayerStatus _status;

        public RegistartionServicesProvider(IPlayerService playerService, IHallPlayerRepository hallPlayerRepository,
            IGameRepository gameRepository, IGamePlayerRepository registrationRepository)
        {
            PlayerService = playerService;
            _hallPlayerRepository = hallPlayerRepository;
            _gameRepository = gameRepository;
            GamePlayerRepository = registrationRepository;
        }

        public IPlayerService PlayerService { get; }

        public IGamePlayerRepository GamePlayerRepository { get; }

        public GameRegisterModel Model { get; set; }

        public PlayerStatus PlayerStatus => GetStatus();

        public Game GetGame()
        {
            return _gameRepository.Get(Model.GameId);
        }

        public bool PlayerBlocked()
        {
            return GetStatus() == PlayerStatus.Blocked;
        }

        private PlayerStatus GetStatus()
        {
            if (_statusLoaded) return _status;

            _statusLoaded = true;
            if (!Model.PlayerValid) return _status = PlayerStatus.Blocked;
            if (!Model.PlayerId.HasValue) return _status = PlayerStatus.Guest;

            var hall = GetGame()?.Hall;
            if (hall == null) return _status = PlayerStatus.Blocked;
            if(hall.IsPublic) return _status = PlayerStatus.Member;

            var hallPlayer = _hallPlayerRepository.GetHallPlayers(hall.Id).Where(x => x.Player.Id == Model.PlayerId).SingleOrDefault();
            return _status = hallPlayer?.Status ?? PlayerStatus.Blocked;
        }

        public bool IsMemberOfHall()
        {
            var hall = GetGame()?.Hall;
            if (hall == null) return false;
            return _hallPlayerRepository.GetHallPlayers(hall.Id).Any(x => x.Player.Id == Model.PlayerId);
        }
    }
}
