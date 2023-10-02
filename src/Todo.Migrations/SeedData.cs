using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Todo.Core.Models;

namespace Todo.Migrations;

public class SeedData
{
	public static async Task InitializeAsync(IServiceProvider services)
	{
		var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

		await AddTestUser(userManager);
	}

	private static async Task AddTestUser(UserManager<ApplicationUser> userManager)
	{
		var testUserExists = userManager.Users.Any(x => x.UserName == "test-user");

		if (!testUserExists)
		{
			await userManager.CreateAsync(
			new ApplicationUser()
			{
				UserName = "test-user",
				Email = "test-user@test.com"
			},
			"Pass123$");
		}
	}
}
