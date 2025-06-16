using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddReviewSSD : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseReviews_AspNetUsers_ApplicationUserId",
                table: "CourseReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseReviews_Courses_CourseId",
                table: "CourseReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseReviews_Enrollments_EnrollmentId",
                table: "CourseReviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseReviews",
                table: "CourseReviews");

            migrationBuilder.RenameTable(
                name: "CourseReviews",
                newName: "Reviews");

            migrationBuilder.RenameIndex(
                name: "IX_CourseReviews_EnrollmentId",
                table: "Reviews",
                newName: "IX_Reviews_EnrollmentId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseReviews_CourseId",
                table: "Reviews",
                newName: "IX_Reviews_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseReviews_ApplicationUserId",
                table: "Reviews",
                newName: "IX_Reviews_ApplicationUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_AspNetUsers_ApplicationUserId",
                table: "Reviews",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Courses_CourseId",
                table: "Reviews",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Enrollments_EnrollmentId",
                table: "Reviews",
                column: "EnrollmentId",
                principalTable: "Enrollments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_AspNetUsers_ApplicationUserId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Courses_CourseId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Enrollments_EnrollmentId",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews");

            migrationBuilder.RenameTable(
                name: "Reviews",
                newName: "CourseReviews");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_EnrollmentId",
                table: "CourseReviews",
                newName: "IX_CourseReviews_EnrollmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_CourseId",
                table: "CourseReviews",
                newName: "IX_CourseReviews_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_ApplicationUserId",
                table: "CourseReviews",
                newName: "IX_CourseReviews_ApplicationUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseReviews",
                table: "CourseReviews",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseReviews_AspNetUsers_ApplicationUserId",
                table: "CourseReviews",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseReviews_Courses_CourseId",
                table: "CourseReviews",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseReviews_Enrollments_EnrollmentId",
                table: "CourseReviews",
                column: "EnrollmentId",
                principalTable: "Enrollments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
