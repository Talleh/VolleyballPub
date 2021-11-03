using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Volleyball.api.Authorization.Requirements;
using Volleyball.api.Models;
using Volleyball.api.Repository;
using Volleyball.api.Services;
using Volleyball.api.Services.GameRegistration;

namespace Volleyball.api.Authorization.Handlers
{
    public class CanEditGamePlayersListHandler : AuthorizationHandler<CanEditGamePlayersList, GameRegisterModel>
    {
        private readonly IRegistrationServiceFactory _registrationServiceFactory;
        private readonly IHttpContextAccessor _httpAccessor;

        public CanEditGamePlayersListHandler(IRegistrationServiceFactory registrationServiceFactory, IHttpContextAccessor http)
        {
            _registrationServiceFactory = registrationServiceFactory;
            _httpAccessor = http;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, CanEditGamePlayersList requirement, GameRegisterModel model)
        {
            var service = _registrationServiceFactory.GetService(model);

            if (_httpAccessor.HttpContext.Request.Path.Value.Contains("register"))
                await HandleRequirementAsync(context, requirement, service.CanRegister);
            else if (_httpAccessor.HttpContext.Request.Path.Value.Contains("unregister"))
                await HandleRequirementAsync(context, requirement, service.CanUnregister);

        }

        private async Task HandleRequirementAsync(AuthorizationHandlerContext context, CanEditGamePlayersList requirement,
            Func<Task<bool>> check)
        {
            var succeeded = await check();
            if (succeeded)
                context.Succeed(requirement);
        }
    }
}
