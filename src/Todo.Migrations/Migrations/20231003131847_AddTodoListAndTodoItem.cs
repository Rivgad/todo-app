using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Todo.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class AddTodoListAndTodoItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TodoLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TodoLists_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TodoItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    TodoId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TodoItems_TodoLists_TodoId",
                        column: x => x.TodoId,
                        principalTable: "TodoLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8e445865-a24d-4543-a6c6-9443d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7cc9c90c-8508-44c4-9aa4-24da8a628fc4", "AQAAAAIAAYagAAAAEMYNxL7xkdOv9QJ6CnmOYpxhX6TxvAToqzlHcXCqg1qhLi5Dm5DICOqRgBYbP2acwg==", "9b0be5fe-1952-44dd-a291-cd68a81be3b7" });

            migrationBuilder.CreateIndex(
                name: "IX_TodoItems_TodoId",
                table: "TodoItems",
                column: "TodoId");

            migrationBuilder.CreateIndex(
                name: "IX_TodoLists_UserId",
                table: "TodoLists",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TodoItems");

            migrationBuilder.DropTable(
                name: "TodoLists");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8e445865-a24d-4543-a6c6-9443d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ebed3a52-0cf6-4074-b77f-66b727f2dc88", "AQAAAAIAAYagAAAAECg4Oy26b+x2Boxd6fQ2xNbQak7aNDdGNI2pTkYH/bgz3/CHECdYRZ0oIQZthn4MEA==", "2326d281-61fd-4eaf-aa4b-333f006a5cdb" });
        }
    }
}
