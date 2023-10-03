using Todo.Core.Models;

namespace Todo.WebApi.Models.Dto;

public static class DtoExtensions
{
	public static TodoListDto ToDto(this TodoList item)
		=> new(item.Id, item.Name, item.Items.Select(item => item.ToDto()).ToList());

	public static TodoItemDto ToDto(this TodoItem item)
		=> new(item.Id, item.Name, item.Status);
}
