using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "article132flag",
                table: "employees",
                newName: "article123_flag");

            migrationBuilder.RenameColumn(
                name: "article62flag",
                table: "contracts",
                newName: "article62_flag");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "article123_flag",
                table: "employees",
                newName: "article132flag");

            migrationBuilder.RenameColumn(
                name: "article62_flag",
                table: "contracts",
                newName: "article62flag");
        }
    }
}
