using Todo.Core.Models;
using Todo.WebApi.Models.Dto;

namespace Todo.WebApi.Extensions;

public static class DtoExtensions
{
    public static TodoListDto ToDto(this TodoList item)
        => new(item.Id, item.Name, item.Items.Select(item => item.ToDto()).ToList());

    public static TodoItemDto ToDto(this TodoItem item)
        => new(item.Id, item.Name, item.Status);
}
