using System.IO;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class CreateEmployeeView : Migration
    {
        const string baseDir = "Resources\\SQLScripts\\";
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var filePath = Path.Combine(baseDir, "Up_Create_Table_Views.sql");
            migrationBuilder.Sql(File.ReadAllText(filePath));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var filePath = Path.Combine(baseDir, "Down_Create_Table_Views.sql");
            migrationBuilder.Sql(File.ReadAllText(filePath));
        }
    }
}
