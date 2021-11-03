using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Volleyball.api.Services.TaxCalculator;
using Volleyball.api.Enitities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Volleyball.api.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Volleyball.api.Repository;
using Volleyball.api.Repository.Implementatios;
using Volleyball.api.Authorization.Requirements;
using Microsoft.AspNetCore.Authorization;
using Volleyball.api.Authorization.Handlers;
using Volleyball.api.Services.Implementations;
using Newtonsoft.Json;
using Volleyball.api.Services.GameRegistration;

namespace Volleyball.api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseLazyLoadingProxies()
                .UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentityCore<Player>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddRoles<IdentityRole<int>>()
                .AddUserManager<UserManager<Player>>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            RegisterRepositories(services);
            RegisterServices(services);

            ConfigureAuthentication(services);
            ConfigureAuthorization(services);
            services.AddCors(o => o.AddPolicy("Cors", p => p.AllowAnyOrigin().AllowAnyHeader()));
            services.AddControllers().AddNewtonsoftJson(o => o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
            services.AddHttpContextAccessor();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseCors("Cors");
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void ConfigureAuthentication(IServiceCollection services)
        {
            services.AddAuthentication(o => {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = Configuration["Tokens:Issuer"],
                        ValidAudience = Configuration["Tokens:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"]))
                    };
                });
        }

        private void ConfigureAuthorization(IServiceCollection services)
        {
            services.AddAuthorization(o => o.AddPolicy(nameof(CanEditGamePlayersList), policy => policy.Requirements.Add(new CanEditGamePlayersList())));
            services.AddTransient<IAuthorizationHandler, CanEditGamePlayersListHandler>();
        }

        private void RegisterRepositories(IServiceCollection services)
        {
            services.AddTransient<IPlayerRepository, PlayerRepository>();
            services.AddTransient<ITaxRepository, TaxRepository>();
            services.AddTransient<IGameRepository, GameRepository>();
            services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IHallRepository, HallRepository>();
            services.AddTransient<IHallPlayerRepository, HallPlayerRepository>();
            services.AddTransient<IGameAgendaRepository, GameAgendaRepository>();
            services.AddTransient<IGamePlayerRepository, GamePlayerRepository>();
        }

        private void RegisterServices(IServiceCollection services)
        {
            services.AddTransient<IFacebookService, FacebookService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<ITaxCalculatorServiceProvider, TaxCalculatorServiceProvider>();
            services.AddTransient<ITaxCalculatorFactory, TaxCalculatorFactory>();
            services.AddTransient<IPlayerService, PlayerService>();
            services.AddTransient<IGameService, GameService>();
            services.AddTransient<IHallService, HallService>();
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IRegistrationServicesProvider, RegistartionServicesProvider>();
            services.AddTransient<IChecksProvider, ChecksProvider>();
            services.AddTransient<IRegistrationServiceFactory, RegistrationServiceFactory>();
        }
    }
}
