using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Extensions;
using Volleyball.api.Models;
using Volleyball.api.Repository;

namespace Volleyball.api.Services.Implementations
{
    public class HallService : IHallService
    {
        private readonly IHallRepository _hallRepository;
        private readonly IGameAgendaRepository _gameAgendaRepository;
        private readonly IHallPlayerRepository _hallPlayerRepository;
        private readonly IPlayerRepository _playerRepository;

        public HallService(IHallRepository hallRepository, IGameAgendaRepository gameAgendaRepository,
            IPlayerRepository playerRepository, IHallPlayerRepository hallPlayerRepository)
        {
            _hallRepository = hallRepository;
            _gameAgendaRepository = gameAgendaRepository;
            _playerRepository = playerRepository;
            _hallPlayerRepository = hallPlayerRepository;
        }

        public HallAgenda AddAgenda(AddAgendaModel model)
        {
            var agenda = _gameAgendaRepository.GetBySchedule(model.Schedule);
            var hallAgenda = _hallRepository.AddAgenda(model.HallId, agenda);
            return hallAgenda;
        }

        public int RemoveAgenda(AddAgendaModel model)
        {
            var agendaId = _gameAgendaRepository.GetBySchedule(model.Schedule)?.Id;
            if (agendaId.HasValue)
            { 
                _hallRepository.RemoveAgenda(model.HallId, agendaId.Value);
                return agendaId.Value;
            }
            return -1;
        }

        public int Create(HallRegistrationModel model)
        {
            var id = _hallRepository.AddOrUpdate(model.Hall);
            RegisterToHall(new RegisterToHallModel
            {
                HallId = id,
                PlayerId = model.Hall.Administrator.Id,
                Status = PlayerStatus.Member
            });
            return id;
        }

        public void Delete(int hallId)
        {
            _hallRepository.Remove(hallId);
        }

        public IEnumerable<Hall> GetAdministratedHallsByUser(int userId)
        {
            return _hallRepository.Get(x => x.Administrator.Id == userId);
        }

        public IEnumerable<Hall> GetAvailableHallsFor(int? userId)
        {
            var publicHalls = _hallRepository.Get(x => x.IsPublic);
            return _hallPlayerRepository.GetPlayerHalls(userId ?? -1).Concat(publicHalls).IdDistinct();
        }

        public void RegisterToHall(RegisterToHallModel model)
        {
            var hall = _hallRepository.Get(model.HallId);
            var isAdmin = hall.Administrator.Id == model.PlayerId;
            var codeValid = CodeValid(model, hall.Code);
            if (!hall.IsPublic && !isAdmin && !codeValid) return;
            
            var player = _playerRepository.Get(model.PlayerId);
            var hallPlayer = new HallPlayer
            {
                Hall = hall,
                Player = player,
                Status = model.Status
            };
            _hallPlayerRepository.AddOrUpdate(hallPlayer);
        }

        private bool CodeValid(RegisterToHallModel model, PrivateHallCode hallCodes)
        {
            if (model.Status != (PlayerStatus.Member | PlayerStatus.SpecialGuest)) return true;
            string code = model.Status == PlayerStatus.Member ? hallCodes.MemberCode : hallCodes.SpecialGuestCode;
            return model.Code == code;
        }

        public IEnumerable<HallPlayer> GetHallPlayers(int adminId, int hallId)
        {
            var hall = _hallRepository.Get(hallId);
            if (hall.Administrator.Id != adminId) return Enumerable.Empty<HallPlayer>();
            return _hallPlayerRepository.GetHallPlayers(hallId);
        }

        public Hall Get(int hallId)
        {
            return _hallRepository.Get(hallId);
        }
    }
}
