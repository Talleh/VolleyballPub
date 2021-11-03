using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volleyball.api.Models;
using Volleyball.api.Services;

namespace Volleyball.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PlayerAccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public PlayerAccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        [Route("supply")]
        public Task Supply([FromBody] PlayerAccountDto account)
        {
            return _accountService.Supply(account);
        }

        [HttpPut]
        [Route("supply/{id}")]
        public Task Supply(int id, [FromQuery] decimal amount)
        {
            return _accountService.Supply(id, amount);
        }

        [HttpPost]
        [Route("withdraw")]
        public Task Withdraw([FromBody] PlayerAccountDto account)
        {
            return _accountService.Withdraw(account);
        }

        [HttpPut]
        [Route("withdraw/{id}")]
        public Task Withdraw(int id, [FromQuery] decimal amount)
        {
            return _accountService.Withdraw(id, amount);
        }
    }
}
