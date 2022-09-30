using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurnikApi.Data.Migrations
{
    public partial class _011 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CommentEntity",
                table: "CommentEntity");

            migrationBuilder.RenameTable(
                name: "CommentEntity",
                newName: "Comment");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedUtc",
                table: "Playground",
                type: "timestamp without time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LikesCount",
                table: "Playground",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedUtc",
                table: "Comment",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comment",
                table: "Comment",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Comment",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "LikesCount",
                table: "Playground");

            migrationBuilder.RenameTable(
                name: "Comment",
                newName: "CommentEntity");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedUtc",
                table: "Playground",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedUtc",
                table: "CommentEntity",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CommentEntity",
                table: "CommentEntity",
                column: "Id");
        }
    }
}
