using Microsoft.EntityFrameworkCore;
using Todo.Core.Context;
using Todo.Core.Models;

namespace Todo.Core.Services;

public class TodoListRepository : ITodoListRepository
{
	private readonly ApplicationDbContext _context;

	public TodoListRepository(ApplicationDbContext context)
	{
		_context = context;
	}

	public async Task<List<TodoList>> GetTodoListsAsync(string userId)
	{
		return await _context.TodoLists
			.AsNoTracking()
			.Where(item => item.UserId == userId)
			.ToListAsync();
	}

	public async Task<TodoList?> GetTodoListAsync(string userId, Guid todoListId)
	{
		return await _context.TodoLists
			.Include(item => item.Items)
			.AsNoTracking()
			.FirstOrDefaultAsync(item => item.UserId == userId && item.Id == todoListId);
	}

	public async Task<TodoList?> CreateTodoListAsync(string userId, string name)
	{
		var user = await _context.Users.FirstOrDefaultAsync(item => item.Id == userId);

		if (user == null)
			return null;

		var item = new TodoList(name);
		user.TodoLists.Add(item);

		await _context.TodoLists.AddAsync(item);
		await _context.SaveChangesAsync();

		return item;
	}

	public async Task<bool> DeleteTodoListAsync(string userId, Guid todoListId)
	{
		var result = await _context.TodoLists
			.Where(item => item.UserId == userId && item.Id == todoListId)
			.ExecuteDeleteAsync();

		return result != 0;
	}
}
