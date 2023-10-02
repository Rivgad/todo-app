using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services
	.AddAuthentication(options =>
	{
		options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
		options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
		options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
	})
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters()
		{
			ValidIssuer = config["JwtSettings:Issuer"],
			ValidAudience = config["JwtSettings:Audience"],
			IssuerSigningKey = new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(config["JwtSettings:Key"]!)),
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			ClockSkew = TimeSpan.FromSeconds(5),
		};
	});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();
