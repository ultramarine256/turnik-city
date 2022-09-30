using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurnikApi.Data.Migrations
{
    /// <inheritdoc />
    public partial class _006 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Playground",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Playground",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "Playground",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Lng",
                table: "Playground",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Playground",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Playground",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Playground");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Playground");

            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Playground");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Playground");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Playground");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Playground");
        }
    }
}
