using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;
using Volleyball.api.Repository;

namespace Volleyball.api.Services.GameRegistration
{
    public interface IRegistrationServicesProvider
    {
        IPlayerService PlayerService { get; }
        IGamePlayerRepository GamePlayerRepository { get; }
        GameRegisterModel Model { get; set; }
        Game GetGame();
        PlayerStatus PlayerStatus { get; }
        bool PlayerBlocked();
        bool IsMemberOfHall();
    }
}
