using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;
using Volleyball.api.Services;

namespace Volleyball.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AccountController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpGet]
        [Route("login/external")]
        public Task<AuthResult> ExternalLogin([FromQuery] string accessToken)
        {
            return _authService.FacebookLoginAsync(accessToken);
        }

        [HttpPost]
        [Route("register")]
        public Task<AuthResult> EmailRegister([FromBody] EmailModel model)
        {
            return _authService.RegisterByEmail(model);
        }

        [HttpPost]
        [Route("login")]
        public Task<AuthResult> EmailLogin([FromBody] EmailModel model)
        {
            return _authService.EmailLogin(model);
        }
    }
}
