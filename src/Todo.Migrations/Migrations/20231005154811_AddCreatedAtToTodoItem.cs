using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Todo.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedAtToTodoItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "TodoItems",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8e445865-a24d-4543-a6c6-9443d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f8cc2629-978d-4e54-a09a-454b2f6766a8", "AQAAAAIAAYagAAAAEIbw7ak6t8SZiG6Ba4iEav2UfYzX65XxK2HH9M1PjP5UGUMtgSopm1p9MuhMsJ75jA==", "de3ad936-b509-4a46-ad43-4786534e0167" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "TodoItems");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8e445865-a24d-4543-a6c6-9443d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e172db85-321b-4547-b1b2-db47a1ca031f", "AQAAAAIAAYagAAAAEKX2neNKrJPnA8QLO/lqHklKPLSA4YDJ1eZPN7TAyfkZE9K7UTdFkchPi3wrr55mvQ==", "0e5b8bdf-bd42-4822-aa64-99eb16de5f01" });
        }
    }
}
