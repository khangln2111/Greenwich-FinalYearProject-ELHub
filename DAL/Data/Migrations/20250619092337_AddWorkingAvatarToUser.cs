using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkingAvatarToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "WorkingAvatarId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_WorkingAvatarId",
                table: "AspNetUsers",
                column: "WorkingAvatarId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Media_WorkingAvatarId",
                table: "AspNetUsers",
                column: "WorkingAvatarId",
                principalTable: "Media",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Media_WorkingAvatarId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_WorkingAvatarId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "WorkingAvatarId",
                table: "AspNetUsers");
        }
    }
}
