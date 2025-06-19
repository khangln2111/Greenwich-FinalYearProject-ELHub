using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserDisplayName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Media_WorkingAvatarId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "WorkingName",
                table: "AspNetUsers",
                newName: "DisplayName");

            migrationBuilder.RenameColumn(
                name: "WorkingAvatarId",
                table: "AspNetUsers",
                newName: "WorkAvatarId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_WorkingAvatarId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_WorkAvatarId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Media_WorkAvatarId",
                table: "AspNetUsers",
                column: "WorkAvatarId",
                principalTable: "Media",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Media_WorkAvatarId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "WorkAvatarId",
                table: "AspNetUsers",
                newName: "WorkingAvatarId");

            migrationBuilder.RenameColumn(
                name: "DisplayName",
                table: "AspNetUsers",
                newName: "WorkingName");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_WorkAvatarId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_WorkingAvatarId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Media_WorkingAvatarId",
                table: "AspNetUsers",
                column: "WorkingAvatarId",
                principalTable: "Media",
                principalColumn: "Id");
        }
    }
}
