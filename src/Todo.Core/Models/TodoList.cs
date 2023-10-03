using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Todo.Core.Models;

public class TodoList
{
	public TodoList(string name)
	{
		Name = name;
	}

	[Key]
	public Guid Id { get; private set; } = Guid.NewGuid();

	[Required]
	[MaxLength(300)]
	public string Name { get; set; }

	public List<TodoItem> Items { get; } = new();

	[Required]
	[ForeignKey(nameof(ApplicationUser))]
	public string UserId { get; private set; } = null!;

	public ApplicationUser? User { get; private set; }
}
