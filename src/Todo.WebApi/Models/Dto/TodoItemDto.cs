using System.Text.Json.Serialization;
using Todo.Core.Models;

namespace Todo.WebApi.Models.Dto;

public record TodoItemDto
{
	public TodoItemDto(Guid id, string name, TodoItemStatus status, DateTime createdAt)
	{
		Id = id;
		Name = name;
		Status = status;
		CreatedAt = createdAt;
	}

	[JsonPropertyName("id")]
	public Guid Id { get; init; }

	[JsonRequired]
	[JsonPropertyName("name")]
	public string Name { get; init; }

	[JsonRequired]
	[JsonConverter(typeof(JsonStringEnumConverter))]
	public TodoItemStatus Status { get; init; }

	[JsonPropertyName("createdAt")]
	public DateTime CreatedAt { get; init; }
}
