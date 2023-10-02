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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapAuthEndpoints();

app.Run();
