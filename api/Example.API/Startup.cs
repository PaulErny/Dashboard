using Example.API.Contexts;
using Example.API.Middlewares;
using Example.API.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace Example.API
{

    public sealed class Startup
    {

        public IConfiguration _configuration { get; }
        public Startup(IConfiguration configuration) {
            _configuration = configuration;
        }

        #region METHODS

        public void Configure(IApplicationBuilder app)
        {
            app.UseRouting();
            app.UseCors();
            app.UseAuthorization();
            app.UseAuthentication();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
            app.UseMiddleware<HttpExceptionHandlingMiddleware>();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
                {
                    options.AddPolicy("ClientPermission", policy =>
                    {
                        policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .WithOrigins("http://localhost:3000")
                            .AllowCredentials();
                    });
                });
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddCors();
            services.AddScoped<IServiceRepository, ServiceRepository>();
            services.AddScoped<IWidgetRepository, WidgetRepository>();
            services.AddScoped<IElementRepository, ElementRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddDbContext<ExampleContext>(options => options.UseNpgsql(_configuration.GetSection("Database:Connection").Value));
            services.AddDbContext<UserContext>(options => options.UseNpgsql(_configuration.GetSection("Database:Connection").Value));
            services.AddDbContext<ServiceContext>(options => options.UseNpgsql(_configuration.GetSection("Database:Connection").Value));
            services.AddControllers()
                        .AddNewtonsoftJson();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

        }

        #endregion METHODS
    }
}
