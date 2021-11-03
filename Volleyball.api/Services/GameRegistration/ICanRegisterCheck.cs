using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Models;

namespace Volleyball.api.Services.GameRegistration
{
    public interface ICanRegisterCheck
    {
        Task<bool> CanRegister();
        Task<bool> CanUnRegister();
        bool IsMandatory { get; }
    }
}
