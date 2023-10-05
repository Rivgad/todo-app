using Microsoft.Extensions.Internal;
using Todo.WebApi.Endpoints;
using Todo.WebApi.Extensions;


var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureIdentity(config);

builder.Services.AddAuthorization();
builder.Services.ConfigureJwtAuthentication(config);

builder.Services.AddAuthServices();
builder.Services.AddTodoListServices();
builder.Services.AddTodoItemsServices();
builder.Services.AddSingleton<ISystemClock, SystemClock>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapAuthEndpoints();

app.MapGroup("/list")
	.RequireAuthorization()
	.WithTags("Todo List")
	.MapTodoEndpoints();

app.MapGroup("/list")
	.RequireAuthorization()
	.WithTags("Todo Item")
	.MapTodoItemEndpoints();

app.Run();
