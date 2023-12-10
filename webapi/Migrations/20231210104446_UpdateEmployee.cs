using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Employees_ManagerId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_ManagerId",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "ManagerId",
                table: "Employees",
                type: "integer",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ManagerId1",
                table: "Employees",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ManagerId1",
                table: "Employees",
                column: "ManagerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Employees_ManagerId1",
                table: "Employees",
                column: "ManagerId1",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Employees_ManagerId1",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_ManagerId1",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ManagerId1",
                table: "Employees");

            migrationBuilder.AlterColumn<long>(
                name: "ManagerId",
                table: "Employees",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ManagerId",
                table: "Employees",
                column: "ManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Employees_ManagerId",
                table: "Employees",
                column: "ManagerId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
