using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Todo.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedAtToTodoList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "TodoLists",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8e445865-a24d-4543-a6c6-9443d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e172db85-321b-4547-b1b2-db47a1ca031f", "AQAAAAIAAYagAAAAEKX2neNKrJPnA8QLO/lqHklKPLSA4YDJ1eZPN7TAyfkZE9K7UTdFkchPi3wrr55mvQ==", "0e5b8bdf-bd42-4822-aa64-99eb16de5f01" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "TodoLists");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8e445865-a24d-4543-a6c6-9443d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7cc9c90c-8508-44c4-9aa4-24da8a628fc4", "AQAAAAIAAYagAAAAEMYNxL7xkdOv9QJ6CnmOYpxhX6TxvAToqzlHcXCqg1qhLi5Dm5DICOqRgBYbP2acwg==", "9b0be5fe-1952-44dd-a291-cd68a81be3b7" });
        }
    }
}
