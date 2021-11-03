using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Services.GameRegistration
{
    public interface IChecksProvider
    {
        IEnumerable<ICanRegisterCheck> Checks { get; }
    }
}
