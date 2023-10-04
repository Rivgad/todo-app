using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Todo.Core.Models;

public class TodoItem
{
	public TodoItem(string name)
	{
		Name = name;
	}

	[Key]
	public Guid Id { get; private set; } = Guid.NewGuid();

	[Required]
	[MaxLength(300)]
	public string Name { get; set; }

	[Required]
	public TodoItemStatus Status { get; set; } = TodoItemStatus.Unfinished;

	[Required]
	[ForeignKey(nameof(TodoList))]
	public Guid TodoId { get; private set; }

	public TodoList Todo { get; private set; } = null!;
}
