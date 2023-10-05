using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Todo.WebApi.Services;

public interface ITokenService
{
	string CreateToken(params Claim[] claims);
}

public class JwtOptions
{
	public required string Issuer { get; set; }
	public required string Audience { get; set; }
	public required string Key { get; set; }

	public SymmetricSecurityKey GetSymmetricSecurityKey() => new(Encoding.UTF8.GetBytes(Key));
}

public class TokenService : ITokenService
{
	private readonly JwtOptions _options;

	public TokenService(IOptions<JwtOptions> options)
	{
		_options = options.Value;
	}

	public string CreateToken(params Claim[] claims)
	{
		var jwt = new JwtSecurityToken(
			issuer: _options.Issuer,
			audience: _options.Audience,
			claims: claims,
			expires: DateTime.UtcNow.Add(TimeSpan.FromDays(30)),
			signingCredentials: new SigningCredentials(
				_options.GetSymmetricSecurityKey(),
				SecurityAlgorithms.HmacSha256));

		return new JwtSecurityTokenHandler().WriteToken(jwt);
	}
}
