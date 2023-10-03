using System.Text.Json.Serialization;

namespace Todo.WebApi.Models.Dto;

public record TodoListDto
{
	public TodoListDto(Guid id, string name, List<TodoItemDto>? items = null)
	{
		Id = id;
		Name = name;
		Tasks = items;
	}

	[JsonPropertyName("id")]
	public Guid Id { get; init; }

	[JsonPropertyName("name")]
	public string Name { get; init; }

	[JsonPropertyName("tasks")]
	[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
	public List<TodoItemDto>? Tasks { get; set; } = null;
}
