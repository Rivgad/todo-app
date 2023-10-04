using Microsoft.AspNetCore.Http.HttpResults;
using System.Security.Claims;
using System.Text.Json.Serialization;
using Todo.Core.Services;
using Todo.WebApi.Extensions;
using Todo.WebApi.Models.Dto;

namespace Todo.WebApi.Endpoints;

public static class TodoListEndpointDefinition
{
	public static RouteGroupBuilder MapTodoEndpoints(this RouteGroupBuilder builder)
	{
		builder.MapGet("", GetTodoLists)
			.WithName(nameof(GetTodoLists));

		builder.MapPost("", CreateTodoList)
			.WithName(nameof(CreateTodoList));

		builder.MapGet("/{todoListId:Guid}", GetTodoList)
			.WithName(nameof(GetTodoList));

		builder.MapDelete("/{todoListId:Guid}", DeleteTodoList)
			.WithName(nameof(DeleteTodoList));

		return builder;
	}

	public static IServiceCollection AddTodoListServices(this IServiceCollection services)
	{
		services.AddTransient<ITodoListRepository, TodoListRepository>();

		return services;
	}

	public record CreateTodoListRequest([property: JsonPropertyName("name")] string Name);

	public static async Task<Ok<List<TodoListDto>>> GetTodoLists(
		ClaimsPrincipal claims,
		ITodoListRepository repository)
	{
		var userId = claims.GetUserId();
		var items = await repository.GetTodoListsAsync(userId);

		return TypedResults.Ok(items.Select(item => item.ToDto()).ToList());
	}

	public static async Task<Results<Created<TodoListDto>, BadRequest>> CreateTodoList(
		ClaimsPrincipal claims,
		ITodoListRepository repository,
		CreateTodoListRequest request)
	{
		var userId = claims.GetUserId();
		var todoList = await repository.CreateTodoListAsync(userId, request.Name);

		if (todoList == null)
			return TypedResults.BadRequest();

		return TypedResults.Created(
			$"/list/{todoList.Id}",
			todoList.ToDto());
	}

	public static async Task<Results<Ok<TodoListDto>, NotFound>> GetTodoList(
		ClaimsPrincipal claims,
		ITodoListRepository repository,
		Guid todoListId)
	{
		var userId = claims.GetUserId();
		var todoList = await repository.GetTodoListAsync(userId, todoListId);

		if (todoList == null)
			return TypedResults.NotFound();

		return TypedResults.Ok(todoList.ToDto());
	}

	public static async Task<Results<NoContent, BadRequest>> DeleteTodoList(
		ClaimsPrincipal claims,
		ITodoListRepository repository,
		Guid todoListId)
	{
		var userId = claims.GetUserId();
		var result = await repository.DeleteTodoListAsync(userId, todoListId);

		if (!result)
			return TypedResults.BadRequest();

		return TypedResults.NoContent();
	}
}
