using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurnikApi.Data.Migrations
{
    /// <inheritdoc />
    public partial class _005 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Playground");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Playground");

            migrationBuilder.AddColumn<string>(
                name: "EquipmentJson",
                table: "Playground",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotosJson",
                table: "Playground",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "Playground",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Playground",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EquipmentJson",
                table: "Playground");

            migrationBuilder.DropColumn(
                name: "PhotosJson",
                table: "Playground");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Playground");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Playground");

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Playground",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Playground",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
