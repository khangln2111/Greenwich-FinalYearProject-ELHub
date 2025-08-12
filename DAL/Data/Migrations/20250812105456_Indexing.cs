using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Data.Migrations
{
    /// <inheritdoc />
    public partial class Indexing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Sections_CourseId",
                table: "Sections");

            migrationBuilder.DropIndex(
                name: "IX_Lectures_SectionId",
                table: "Lectures");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_CourseId",
                table: "Enrollments");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_UserId",
                table: "Enrollments");

            migrationBuilder.AddColumn<Guid>(
                name: "ReviewId",
                table: "Enrollments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sections_CourseId_Id",
                table: "Sections",
                columns: new[] { "CourseId", "Id" });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_Rating_EnrollmentId",
                table: "Reviews",
                columns: new[] { "Rating", "EnrollmentId" });

            migrationBuilder.CreateIndex(
                name: "IX_Media_Type",
                table: "Media",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_Lectures_SectionId_Id",
                table: "Lectures",
                columns: new[] { "SectionId", "Id" });

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_CourseId_Id",
                table: "Enrollments",
                columns: new[] { "CourseId", "Id" });

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_CourseId_ReviewId",
                table: "Enrollments",
                columns: new[] { "CourseId", "ReviewId" });

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_UserId_CourseId",
                table: "Enrollments",
                columns: new[] { "UserId", "CourseId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Sections_CourseId_Id",
                table: "Sections");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_Rating_EnrollmentId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Media_Type",
                table: "Media");

            migrationBuilder.DropIndex(
                name: "IX_Lectures_SectionId_Id",
                table: "Lectures");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_CourseId_Id",
                table: "Enrollments");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_CourseId_ReviewId",
                table: "Enrollments");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_UserId_CourseId",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "ReviewId",
                table: "Enrollments");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_CourseId",
                table: "Sections",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Lectures_SectionId",
                table: "Lectures",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_CourseId",
                table: "Enrollments",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_UserId",
                table: "Enrollments",
                column: "UserId");
        }
    }
}
