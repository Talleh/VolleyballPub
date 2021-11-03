using Microsoft.EntityFrameworkCore.Migrations;

namespace Volleyball.api.Migrations
{
    public partial class Add_Hall : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Halls",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Address = table.Column<string>(nullable: false),
                    AdministratorId = table.Column<int>(nullable: false),
                    SubscriptionAllowed = table.Column<bool>(nullable: false),
                    MinPlayers = table.Column<int>(nullable: false),
                    MaxPlayers = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Halls", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Halls_AspNetUsers_AdministratorId",
                        column: x => x.AdministratorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HallAgenda",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HallId = table.Column<int>(nullable: false),
                    GameAgendasId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HallAgenda", x => new {x.HallId, x.GameAgendasId });
                    table.ForeignKey(
                        name: "FK_HallAgenda_GameAgendas_GameAgendasId",
                        column: x => x.GameAgendasId,
                        principalTable: "GameAgendas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HallAgenda_Halls_HallId",
                        column: x => x.HallId,
                        principalTable: "Halls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HallAgenda_GameAgendasId",
                table: "HallAgenda",
                column: "GameAgendasId");

            migrationBuilder.CreateIndex(
                name: "IX_HallAgenda_HallId",
                table: "HallAgenda",
                column: "HallId");

            migrationBuilder.CreateIndex(
                name: "IX_Halls_AdministratorId",
                table: "Halls",
                column: "AdministratorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HallAgenda");

            migrationBuilder.DropTable(
                name: "Halls");
        }
    }
}
