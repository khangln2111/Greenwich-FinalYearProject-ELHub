using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddNewEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_AspNetUsers_ApplicationUserId",
                table: "Inventories");

            migrationBuilder.RenameColumn(
                name: "ApplicationUserId",
                table: "Inventories",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Inventories_ApplicationUserId",
                table: "Inventories",
                newName: "IX_Inventories_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_AspNetUsers_UserId",
                table: "Inventories",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_AspNetUsers_UserId",
                table: "Inventories");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Inventories",
                newName: "ApplicationUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Inventories_UserId",
                table: "Inventories",
                newName: "IX_Inventories_ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_AspNetUsers_ApplicationUserId",
                table: "Inventories",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
