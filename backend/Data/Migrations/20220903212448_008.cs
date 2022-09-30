using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurnikApi.Data.Migrations
{
    /// <inheritdoc />
    public partial class _008 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Playground",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDateTime",
                table: "Playground",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Playground");

            migrationBuilder.DropColumn(
                name: "CreatedDateTime",
                table: "Playground");
        }
    }
}
