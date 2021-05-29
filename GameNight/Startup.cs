using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using GameNight.DataAccess;

namespace GameNight
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
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                    {
                        options.IncludeErrorDetails = true;
                        options.Authority = "https://securetoken.google.com/gamenight-41b97";
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateLifetime = true,
                            ValidateAudience = true,
                            ValidateIssuer = true,
                            ValidAudience = "gamenight-41b97",
                            ValidIssuer = "https://securetoken.google.com/gamenight-41b97"
                        };
                    });
            services.AddControllers();

            services.AddSingleton(Configuration);
            services.AddTransient<UsersRepository>();
            services.AddTransient<GameGroupsRepository>();
            services.AddTransient<GroupUsersRepository>();
            services.AddTransient<BoardGamesRepository>();
            services.AddTransient<GameNightsRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
