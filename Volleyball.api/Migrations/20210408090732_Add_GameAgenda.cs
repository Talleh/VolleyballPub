using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Volleyball.api.Migrations
{
    public partial class Add_GameAgenda : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GameAgendas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Day = table.Column<int>(nullable: false),
                    Start = table.Column<TimeSpan>(nullable: false),
                    End = table.Column<TimeSpan>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameAgendas", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameAgendas");
        }
    }
}
