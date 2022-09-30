using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurnikApi.Data.Migrations
{
    /// <inheritdoc />
    public partial class _010 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Playground");

            migrationBuilder.AddColumn<int>(
                name: "ViewsCount",
                table: "Playground",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ViewsCount",
                table: "Playground");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Playground",
                type: "text",
                nullable: true);
        }
    }
}
