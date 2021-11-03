using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;

namespace Volleyball.api.Services
{
    public interface IHallService
    {
        int Create(HallRegistrationModel model);
        HallAgenda AddAgenda(AddAgendaModel model);
        void Delete(int hallId);
        Hall Get(int hallId);
        IEnumerable<Hall> GetAdministratedHallsByUser(int userId);
        IEnumerable<Hall> GetAvailableHallsFor(int? userId);
        IEnumerable<HallPlayer> GetHallPlayers(int adminId, int hallId);
        int RemoveAgenda(AddAgendaModel model);
        void RegisterToHall(RegisterToHallModel model);
    }
}
