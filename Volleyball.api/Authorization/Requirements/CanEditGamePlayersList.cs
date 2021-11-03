using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Models;

namespace Volleyball.api.Authorization.Requirements
{
    public class CanEditGamePlayersList : IAuthorizationRequirement
    {
    }
}
