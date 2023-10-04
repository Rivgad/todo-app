using Microsoft.AspNetCore.Identity;

namespace Todo.Core.Models;

public class ApplicationUser : IdentityUser
{
	public List<TodoList> TodoLists { get; } = new();
}
