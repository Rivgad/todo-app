using System.Security.Claims;

namespace Todo.WebApi.Extensions;

public static class ClaimsPrincipalExtensions
{
	public static string GetUserId(this ClaimsPrincipal principal)
	{
		if (principal == null)
			throw new ArgumentNullException(nameof(principal));

		var claim = principal.FindFirst(ClaimTypes.NameIdentifier);

		if (claim == null)
			throw new KeyNotFoundException(nameof(ClaimTypes.NameIdentifier));

		return claim.Value;
	}
}
