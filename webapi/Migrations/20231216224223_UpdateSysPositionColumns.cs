using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSysPositionColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NPKDSlave",
                table: "SysPositions",
                newName: "NpkdSlave");

            migrationBuilder.RenameColumn(
                name: "NPKDId",
                table: "SysPositions",
                newName: "NpkdId");

            migrationBuilder.RenameColumn(
                name: "NPKDBase",
                table: "SysPositions",
                newName: "NpkdBase");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NpkdSlave",
                table: "SysPositions",
                newName: "NPKDSlave");

            migrationBuilder.RenameColumn(
                name: "NpkdId",
                table: "SysPositions",
                newName: "NPKDId");

            migrationBuilder.RenameColumn(
                name: "NpkdBase",
                table: "SysPositions",
                newName: "NPKDBase");
        }
    }
}
