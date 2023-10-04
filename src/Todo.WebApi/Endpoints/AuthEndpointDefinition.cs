using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Todo.Core.Models;
using Todo.WebApi.Services;

namespace Todo.WebApi.Endpoints;


public static class AuthEndpointDefinition
{
	public static WebApplication MapAuthEndpoints(this WebApplication app)
	{
		app.MapPost("/signin", SignIn);
		app.MapPost("/signup", SignUp);

		return app;
	}

	public static IServiceCollection AddAuthServices(this IServiceCollection services)
	{
		services.AddSingleton<ITokenService, TokenService>();

		return services;
	}

	public record AuthRequest(string username, string password);

	public static async Task<Results<Ok<string>, BadRequest>> SignIn(
		UserManager<ApplicationUser> userManager,
		ITokenService tokenService,
		AuthRequest request)
	{
		var user = await userManager.FindByNameAsync(request.username);

		if (user == null)
			return TypedResults.BadRequest();

		if (!await userManager.CheckPasswordAsync(user, request.password))
			return TypedResults.BadRequest();

		var token = tokenService.CreateToken(
			new Claim(ClaimTypes.Name, user.UserName!),
			new Claim(ClaimTypes.NameIdentifier, user.Id));

		return TypedResults.Ok(token);
	}

	public static async Task<Results<Ok<ApplicationUser>, BadRequest>> SignUp(
		UserManager<ApplicationUser> userManager,
		string username,
		string password)
	{
		if (await userManager.FindByNameAsync(username) != null)
			return TypedResults.BadRequest();

		var result = await userManager.CreateAsync(
			new ApplicationUser()
			{
				UserName = username,
			},
			password);

		if (!result.Succeeded)
			return TypedResults.BadRequest();

		var user = await userManager.FindByNameAsync(username);

		return TypedResults.Ok(user);
	}
}
