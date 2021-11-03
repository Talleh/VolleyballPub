using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Services.GameRegistration
{
    public abstract class BaseRegistrationService : IRegistrationService
    {
        protected IRegistrationServicesProvider provider;
        private readonly IChecksProvider _checksProvider;

        protected BaseRegistrationService(IRegistrationServicesProvider provider, IChecksProvider checksProvider)
        {
            this.provider = provider;
            _checksProvider = checksProvider;
        }

        public async Task<bool> CanRegister()
        {
            foreach (var mandoryCheck in _checksProvider.Checks.Where(x => x.IsMandatory))
                if (!await mandoryCheck.CanRegister()) return false;
            foreach (var mandoryCheck in _checksProvider.Checks.Where(x => !x.IsMandatory))
                if (await mandoryCheck.CanRegister()) return true;
            return false;
        }

        public async Task<bool> CanUnregister()
        {
            foreach (var mandoryCheck in _checksProvider.Checks.Where(x => x.IsMandatory))
                if (!await mandoryCheck.CanUnRegister()) return false;
            foreach (var mandoryCheck in _checksProvider.Checks.Where(x => !x.IsMandatory))
                if (await mandoryCheck.CanUnRegister()) return true;
            return false;
        }

        public abstract void Register();

        public abstract void UnRegister();
    }
}
