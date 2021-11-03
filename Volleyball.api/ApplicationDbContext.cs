using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api
{
    public class ApplicationDbContext : IdentityDbContext<Player, IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<GameAgenda> GameAgendas { get; set; }
        public virtual DbSet<Hall> Halls { get; set; }
        public virtual DbSet<Game> Games { get; set; }
        public virtual DbSet<HallTax> HallTaxs { get; set; }
        public virtual DbSet<HallPlayer> HallPlayers { get; set; }

        public virtual DbSet<PlayerAccount> PlayersAccount { get; set; }
    }
}
