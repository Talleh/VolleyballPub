using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Models;
using Volleyball.api.Repository;

namespace Volleyball.api.Services.Implementations
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _repository;
        private readonly IPlayerRepository _playerRepository;
        private readonly IHallRepository _hallRepository;
        public AccountService(IAccountRepository repository, IPlayerRepository playerRepository, IHallRepository hallRepository)
        {
            _repository = repository;
            _playerRepository = playerRepository;
            _hallRepository = hallRepository;
        }

        public PlayerAccount Get(PlayerAccountDto dto)
        {
            var account = _repository.Get(dto.PlayerId, dto.HallId);
            if (account == null)
                account = new PlayerAccount
                {
                    Hall = _hallRepository.Get(dto.HallId),
                    Player = _playerRepository.Get(dto.PlayerId)
                };
            account.Id = _repository.AddOrUpdate(account);
            return account;
        }

        public Task Supply(int accountId, decimal amount)
        {
            var account = _repository.Get(accountId);
            Operation(account, amount, OperationType.Supply);
            return Task.CompletedTask;
        }

        public Task Supply(PlayerAccountDto account)
        {
            Operation(account, OperationType.Supply);
            return Task.CompletedTask;
        }

        public Task Withdraw(int accountId, decimal amount)
        {
            var account = _repository.Get(accountId);
            Operation(account, amount, OperationType.Withdraw);
            return Task.CompletedTask;
        }

        public Task Withdraw(PlayerAccountDto account)
        {
            Operation(account, OperationType.Withdraw);
            return Task.CompletedTask;
        }

        private void Operation(PlayerAccountDto dto, OperationType operation)
        {
            var account = Get(dto);
            Operation(account, dto.Amount, operation);
        }

        private void Operation(PlayerAccount account, decimal amount, OperationType operation)
        {
            account.Amount += operation == OperationType.Supply ? amount : -amount;
            _repository.AddOrUpdate(account);
        }

        private enum OperationType
        {
            Supply,
            Withdraw
        }
    }
}
