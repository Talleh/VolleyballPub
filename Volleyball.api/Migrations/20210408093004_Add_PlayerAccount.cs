using Microsoft.EntityFrameworkCore.Migrations;

namespace Volleyball.api.Migrations
{
    public partial class Add_PlayerAccount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlayersAccount",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlayerId = table.Column<int>(nullable: false),
                    HallId = table.Column<int>(nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayersAccount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlayersAccount_Halls_HallId",
                        column: x => x.HallId,
                        principalTable: "Halls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayersAccount_AspNetUsers_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlayersAccount_HallId",
                table: "PlayersAccount",
                column: "HallId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayersAccount_PlayerId",
                table: "PlayersAccount",
                column: "PlayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayersAccount");
        }
    }
}
