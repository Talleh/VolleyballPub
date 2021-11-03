using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;

namespace Volleyball.api.Services
{
    public interface IAuthService
    {
        Task<AuthResult> FacebookLoginAsync(string accessToken);
        Task<AuthResult> RegisterByEmail(EmailModel model);
        Task<AuthResult> EmailLogin(EmailModel model);
    }
}
