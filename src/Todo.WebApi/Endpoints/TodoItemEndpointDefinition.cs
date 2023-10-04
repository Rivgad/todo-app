using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text.Json.Serialization;
using Todo.Core.Services;
using Todo.Core.Services.Interfaces;
using Todo.WebApi.Extensions;
using Todo.WebApi.Models.Dto;

namespace Todo.WebApi.Endpoints;

public static class TodoItemEndpointDefinition
{
	public static RouteGroupBuilder MapTodoItemEndpoints(this RouteGroupBuilder builder)
	{
		builder.MapPost("/{todoListId:Guid}", CreateTodoItem)
			.WithName(nameof(CreateTodoItem));

		builder.MapPut("/items/{todoItemId:Guid}", UpdateTodoItem)
			.WithName(nameof(UpdateTodoItem));

		builder.MapDelete("/items/{todoItemId:Guid}", DeleteTodoItem)
			.WithName(nameof(DeleteTodoItem));

		return builder;
	}

	public static IServiceCollection AddTodoItemsServices(this IServiceCollection services)
	{
		services.AddTransient<ITodoItemsRepository, TodoItemsRepository>();

		return services;
	}

	public record CreateTodoItemRequest([property: JsonPropertyName("name")] string Name);

	public static async Task<Results<Created<TodoItemDto>, BadRequest>> CreateTodoItem(
		ClaimsPrincipal claims,
		ITodoItemsRepository repository,
		Guid todoListId,
		CreateTodoItemRequest request)
	{
		if (string.IsNullOrEmpty(request.Name))
			return TypedResults.BadRequest();

		var userId = claims.GetUserId();

		var todoItem = await repository.CreateTodoItemAsync(userId, todoListId, request.Name);

		if (todoItem == null)
			return TypedResults.BadRequest();

		return TypedResults.Created(
			$"/list/{todoListId}/{todoItem.Id}",
			todoItem.ToDto());
	}

	public static async Task<Results<Ok<TodoItemDto>, BadRequest, NotFound>> UpdateTodoItem(
		ClaimsPrincipal claims,
		ITodoItemsRepository repository,
		Guid todoItemId,
		[FromBody] TodoItemDto itemDto)
	{
		if (itemDto.Name.IsNullOrEmpty())
			return TypedResults.BadRequest();

		var userId = claims.GetUserId();

		var item = await repository.UpdateTodoItemAsync(
			userId,
			todoItemId,
			itemDto.Name,
			itemDto.Status);

		if (item == null)
			return TypedResults.NotFound();

		return TypedResults.Ok(item.ToDto());
	}

	public static async Task<Results<NoContent, BadRequest>> DeleteTodoItem(
		ClaimsPrincipal claims,
		ITodoItemsRepository repository,
		Guid todoItemId)
	{
		var userId = claims.GetUserId();

		var result = await repository.DeleteTodoItemAsync(userId, todoItemId);

		if (!result)
			return TypedResults.BadRequest();

		return TypedResults.NoContent();
	}
}
