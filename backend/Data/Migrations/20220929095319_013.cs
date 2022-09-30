using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurnikApi.Data.Migrations
{
    public partial class _013 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rank",
                table: "Playground");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rank",
                table: "Playground",
                type: "integer",
                nullable: true);
        }
    }
}
