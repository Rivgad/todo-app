using Todo.Core.Models;


namespace Todo.Core.Services.Interfaces;

public interface ITodoItemsRepository
{
    Task<TodoItem?> CreateTodoItemAsync(string userId, Guid todoListId, string name);

    Task<TodoItem?> UpdateTodoItemAsync(
        string userId,
        Guid todoItemId,
        string name,
        TodoItemStatus status);

    Task<bool> DeleteTodoItemAsync(string userId, Guid todoItemId);
}
