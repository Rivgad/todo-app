using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Todo.Core.Models;

namespace Todo.Core;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
	{
	}
}
