using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;

namespace Volleyball.api.Services
{
    public class AuthService : IAuthService
    {
        private readonly IFacebookService _facebookService;
        private readonly IConfiguration _configuration;
        private readonly UserManager<Player> _userManager;
        public AuthService(IFacebookService facebookService, IConfiguration configuration, UserManager<Player> userManager)
        {
            _facebookService = facebookService;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<AuthResult> EmailLogin(EmailModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return AuthResult.Failed("Email or password invalid");
            var passwordValid = await _userManager.CheckPasswordAsync(user, model.Password);
            if(!passwordValid)
                return AuthResult.Failed("Email or password invalid");

            var token = CreateAccessToken(user.Id, user.Email);
            return AuthResult.Succeded(token, user.Id);
        }

        public async Task<AuthResult> FacebookLoginAsync(string accessToken)
        {
            var faceBookUser = await _facebookService.GetUser(accessToken);
            var domainUser = faceBookUser.ConvertToDomainUser();
            var shouldRegister = (await _userManager.FindByEmailAsync(domainUser.Email)) == null;

            if (shouldRegister)
            {
                var result = await _userManager.CreateAsync(domainUser);
                if (!result.Succeeded)
                {
                    return AuthResult.Failed(result.Errors.First().Description);
                }
            }
            else await _userManager.UpdateAsync(domainUser);

            var token = CreateAccessToken(domainUser.Id, domainUser.Email);
            return AuthResult.Succeded(token, domainUser.Id);
        }

        public async Task<AuthResult> RegisterByEmail(EmailModel model)
        {
            var userExists = (await _userManager.FindByEmailAsync(model.Email)) != null;
            if (userExists)
                return AuthResult.Failed("User with this email exists");
            var domainUser = new Player
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.Name.Split(' ').FirstOrDefault(),
                LastName = model.Name.Split(' ').LastOrDefault()
            };
            var result = await _userManager.CreateAsync(domainUser);
            if (!result.Succeeded)
            {
                return AuthResult.Failed(result.Errors.First().Description);
            }
            await _userManager.AddPasswordAsync(domainUser, model.Password);

            var token = CreateAccessToken(domainUser.Id, domainUser.Email);
            return AuthResult.Succeded(token, domainUser.Id);
        }

        private string CreateAccessToken(int id, string email)
        {
            var now = DateTime.UtcNow;
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, email),
            };

            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"])),
                SecurityAlgorithms.HmacSha256);
            var expiry = now.AddMinutes(double.Parse(_configuration["Tokens:AccessExpireMinutes"]));
            var jwt = new JwtSecurityToken(_configuration["Tokens:Issuer"], _configuration["Tokens:Audience"], claims, now, expiry, signingCredentials);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

    }
}
