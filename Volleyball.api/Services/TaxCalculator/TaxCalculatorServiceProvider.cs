using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;
using Volleyball.api.Repository;

namespace Volleyball.api.Services.TaxCalculator
{
    public class TaxCalculatorServiceProvider : ITaxCalculatorServiceProvider
    {
        private Game _game;
        private readonly IGameRepository _gameRepository;
        private readonly ITaxRepository _taxRepository;
        private readonly IAccountRepository _accountRepository;

        public TaxCalculatorServiceProvider(IAccountRepository accountRepository,
                                  IGameRepository gameRepository, ITaxRepository taxRepository)
        {
            _gameRepository = gameRepository;
            _taxRepository = taxRepository;
            _accountRepository = accountRepository;
        }

        public int PlayerId { get; set; }
        public int GameId { get; set; }

        public Game GetGame()
        {
            if (_game == null)
                _game = _gameRepository.Get(GameId);
            return _game;
        }

        public Hall GetHall()
        {
            _game = GetGame();
            return _game?.Hall;
        }

        public HallTax GetHallTax()
        {
            var hall = GetHall();
            return _taxRepository.GetHallTax(hall.Id);
        }

        public decimal GetPlayerAmount()
        {
            var hall = GetHall();
            var playerAccount = _accountRepository.Get(PlayerId, hall.Id);
            return playerAccount?.Amount ?? 0;
        }
    }
}
