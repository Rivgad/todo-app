using Microsoft.EntityFrameworkCore;
using Todo.Core.Context;
using Todo.Core.Models;
using Todo.Core.Services.Interfaces;

namespace Todo.Core.Services;

public class TodoItemsRepository : ITodoItemsRepository
{
	private readonly ApplicationDbContext _context;

	public TodoItemsRepository(ApplicationDbContext context)
	{
		_context = context;
	}

	public async Task<TodoItem?> CreateTodoItemAsync(string userId, Guid todoListId, string name)
	{
		var todoList = await _context.TodoLists
			.FirstOrDefaultAsync(item => item.UserId == userId && item.Id == todoListId);

		if (todoList == null)
			return null;

		var item = new TodoItem(name);
		todoList.Items.Add(item);

		await _context.TodoItems.AddAsync(item);
		await _context.SaveChangesAsync();

		return item;
	}

	public async Task<TodoItem?> UpdateTodoItemAsync(
		string userId,
		Guid todoItemId,
		string name,
		TodoItemStatus status)
	{
		var item = await _context.TodoItems
			.FirstOrDefaultAsync(item => item.Todo.UserId == userId && item.Id == todoItemId);

		if (item == null)
			return null;

		item.Name = name;
		item.Status = status;

		_context.TodoItems.Update(item);
		await _context.SaveChangesAsync();

		return item;
	}

	public async Task<bool> DeleteTodoItemAsync(string userId, Guid todoItemId)
	{
		var result = await _context.TodoItems
			.Where(item => item.Todo.UserId == userId && item.Id == todoItemId)
			.ExecuteDeleteAsync();

		return result != 0;
	}
}
