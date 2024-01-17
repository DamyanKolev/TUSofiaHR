using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTableViews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "personal_id_issue_by",
                table: "personal_datas",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "personal_id_number",
                table: "personal_datas",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "employees",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "is_terminate",
                table: "contracts",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "personal_id_issue_by",
                table: "personal_datas");

            migrationBuilder.DropColumn(
                name: "personal_id_number",
                table: "personal_datas");

            migrationBuilder.DropColumn(
                name: "email",
                table: "employees");

            migrationBuilder.DropColumn(
                name: "is_terminate",
                table: "contracts");
        }
    }
}
