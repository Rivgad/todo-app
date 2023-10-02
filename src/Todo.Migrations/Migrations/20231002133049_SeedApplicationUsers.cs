using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Todo.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class SeedApplicationUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "8e445865-a24d-4543-a6c6-9443d048cdb9", 0, "ebed3a52-0cf6-4074-b77f-66b727f2dc88", "test_user@mail.com", false, false, null, null, "test_user", "AQAAAAIAAYagAAAAECg4Oy26b+x2Boxd6fQ2xNbQak7aNDdGNI2pTkYH/bgz3/CHECdYRZ0oIQZthn4MEA==", null, false, "2326d281-61fd-4eaf-aa4b-333f006a5cdb", false, "test_user" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8e445865-a24d-4543-a6c6-9443d048cdb9");
        }
    }
}
