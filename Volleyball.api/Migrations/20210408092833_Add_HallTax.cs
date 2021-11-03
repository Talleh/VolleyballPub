using Microsoft.EntityFrameworkCore.Migrations;

namespace Volleyball.api.Migrations
{
    public partial class Add_HallTax : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HallTaxs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HallId = table.Column<int>(nullable: false),
                    IsSubscriptionTaxDinamic = table.Column<bool>(nullable: false),
                    SubscribedPlayerTax = table.Column<decimal>(type: "money", nullable: false),
                    RegularPlayerTax = table.Column<decimal>(type: "money", nullable: false),
                    IsRegularTaxDinamic = table.Column<bool>(nullable: false),
                    MonthRentTax = table.Column<decimal>(type: "money", nullable: true),
                    GameRentTax = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HallTaxs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HallTaxs_Halls_HallId",
                        column: x => x.HallId,
                        principalTable: "Halls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HallTaxs_HallId",
                table: "HallTaxs",
                column: "HallId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HallTaxs");
        }
    }
}
