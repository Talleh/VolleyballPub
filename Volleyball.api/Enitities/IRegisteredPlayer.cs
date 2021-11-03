using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Enitities
{
    public interface IRegisteredPlayer : IEntity
    {
        string Picture { get; }
        string Name { get; }
        public int PlayerId { get; }
        PlayerStatus Status { get; }
        DateTime RegisterDate { get; set; }
        bool Replaced { get; set; }
        Game Game { get; set; }
    }
}
