using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Volleyball.api.Enitities;
using Volleyball.api.Repository;
using Volleyball.api.Services;
using Volleyball.api.Services.TaxCalculator;

namespace Volleyball.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public PlayerController(IPlayerService playerService, IWebHostEnvironment hostEnvironment)
        {
            _playerService = playerService;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public Task<Player> Get()
        {
            return _playerService.GetCurrentPlayer();
        }

        [HttpPost("uploadFile")]
        public async Task<string> UploadFile()
        {
            var file = HttpContext.Request.Body;
            var path = _hostEnvironment.WebRootPath + '\\' + "file.jpg";
            using(var streamWriter = new FileStream(path, FileMode.OpenOrCreate))
            {
                await file.CopyToAsync(streamWriter);
            }
            
            return path;
        }
    }
}
