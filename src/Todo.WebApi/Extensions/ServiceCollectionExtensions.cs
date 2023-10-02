using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.Text;
using Todo.Core.Context;
using Todo.Core.Models;
using Todo.WebApi.Services;

namespace Todo.WebApi.Extensions;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection ConfigureIdentity(
		this IServiceCollection services,
		IConfiguration configuration)
	{
		services.AddDbContext<ApplicationDbContext>(options =>
		{
			var connectionStringBuilder = new NpgsqlConnectionStringBuilder(
				configuration["Npgsql:ConnectionString"]);

			options.UseNpgsql(
				connectionStringBuilder.ConnectionString,
				builder => builder.MigrationsAssembly("Todo.Migrations"));
		});

		services.AddIdentityCore<ApplicationUser>()
			.AddEntityFrameworkStores<ApplicationDbContext>()
			.AddDefaultTokenProviders();

		return services;
	}

	public static AuthenticationBuilder ConfigureJwtAuthentication(
		this IServiceCollection services,
		IConfiguration configuration)
	{
		services.Configure<JwtOptions>(configuration.GetSection("JwtSettings"));

		return services
			.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters()
				{
					ValidateIssuer = true,
					ValidIssuer = configuration["JwtSettings:Issuer"],

					ValidateAudience = true,
					ValidAudience = configuration["JwtSettings:Audience"],

					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(
						Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"]!)),

					ValidateLifetime = true,
					ClockSkew = TimeSpan.FromSeconds(5),
				};
			});
	}
}
