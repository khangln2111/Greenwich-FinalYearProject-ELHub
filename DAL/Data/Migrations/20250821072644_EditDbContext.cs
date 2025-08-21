using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Data.Migrations
{
    /// <inheritdoc />
    public partial class EditDbContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WalletTransaction_AspNetUsers_UserId",
                table: "WalletTransaction");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WalletTransaction",
                table: "WalletTransaction");

            migrationBuilder.RenameTable(
                name: "WalletTransaction",
                newName: "WalletTransactions");

            migrationBuilder.RenameIndex(
                name: "IX_WalletTransaction_UserId",
                table: "WalletTransactions",
                newName: "IX_WalletTransactions_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WalletTransactions",
                table: "WalletTransactions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WalletTransactions_AspNetUsers_UserId",
                table: "WalletTransactions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WalletTransactions_AspNetUsers_UserId",
                table: "WalletTransactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WalletTransactions",
                table: "WalletTransactions");

            migrationBuilder.RenameTable(
                name: "WalletTransactions",
                newName: "WalletTransaction");

            migrationBuilder.RenameIndex(
                name: "IX_WalletTransactions_UserId",
                table: "WalletTransaction",
                newName: "IX_WalletTransaction_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WalletTransaction",
                table: "WalletTransaction",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WalletTransaction_AspNetUsers_UserId",
                table: "WalletTransaction",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
