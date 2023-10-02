using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.Text;
using Todo.Core.Context;
using Todo.Core.Models;
using Todo.WebApi.Endpoints;
using Todo.WebApi.Services;


var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<JwtOptions>(config.GetSection("JwtSettings"));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
	var connectionStringBuilder = new NpgsqlConnectionStringBuilder(config["Npgsql:ConnectionString"]);

	options.UseNpgsql(connectionStringBuilder.ConnectionString, x => x.MigrationsAssembly("Todo.Migrations"));
});

builder.Services.AddIdentityCore<ApplicationUser>()
	.AddEntityFrameworkStores<ApplicationDbContext>()
	.AddDefaultTokenProviders();

builder.Services.AddAuthorization();
builder.Services
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
			ValidIssuer = config["JwtSettings:Issuer"],

			ValidateAudience = true,
			ValidAudience = config["JwtSettings:Audience"],

			ValidateIssuerSigningKey = true,
			IssuerSigningKey = new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(config["JwtSettings:Key"]!)),

			ValidateLifetime = true,
			ClockSkew = TimeSpan.FromSeconds(5),
		};
	});

builder.Services.AddAuthServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseAuthorization();

app.MapAuthEndpoints();

app.MapGet(
	"/secure",
	[Authorize] (HttpContext context) =>
	{

		return "Super secret info!";
	});

app.Run();
