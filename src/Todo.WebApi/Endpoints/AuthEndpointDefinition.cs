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

	public record AuthRequest(string Username, string Password);

	public record TokenResponse(string AccessToken);

	public static async Task<Results<Ok<TokenResponse>, BadRequest>> SignIn(
		UserManager<ApplicationUser> userManager,
		ITokenService tokenService,
		AuthRequest request)
	{
		var user = await userManager.FindByNameAsync(request.Username);

		if (user == null)
			return TypedResults.BadRequest();

		if (!await userManager.CheckPasswordAsync(user, request.Password))
			return TypedResults.BadRequest();

		var token = tokenService.CreateToken(
			new Claim(ClaimTypes.Name, user.UserName!),
			new Claim(ClaimTypes.NameIdentifier, user.Id));

		return TypedResults.Ok(new TokenResponse(token));
	}

	public static async Task<Results<Ok, BadRequest>> SignUp(
		UserManager<ApplicationUser> userManager,
		AuthRequest authRequest)
	{
		if (await userManager.FindByNameAsync(authRequest.Username) != null)
			return TypedResults.BadRequest();

		var result = await userManager.CreateAsync(
			new ApplicationUser()
			{
				UserName = authRequest.Username,
			},
			authRequest.Password);

		if (!result.Succeeded)
			return TypedResults.BadRequest();

		return TypedResults.Ok();
	}
}
