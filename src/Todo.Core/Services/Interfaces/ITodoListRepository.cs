using Todo.Core.Models;

namespace Todo.Core.Services;

public interface ITodoListRepository
{
	Task<List<TodoList>> GetTodoListsAsync(string userId);

	Task<TodoList?> GetTodoListAsync(string userId, Guid todoListId);

	Task<TodoList?> CreateTodoListAsync(string userId, string name);

	Task<bool> DeleteTodoListAsync(string userId, Guid todoListId);
}
