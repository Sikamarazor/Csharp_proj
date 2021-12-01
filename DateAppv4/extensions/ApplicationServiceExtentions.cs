using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DateAppv4.Data;
using DateAppv4.Interfaces;
using DateAppv4.Services;
using Microsoft.EntityFrameworkCore;

namespace DateAppv4.extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<DataContext>(options => {
                options.UseSqlite(configuration.GetConnectionString("Default"));
            });

            return services;
        }
    }
}