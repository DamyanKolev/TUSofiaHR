using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class SeedDataAndViews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            const string baseDir = "Resources\\SQLScripts\\";
            var filePath = Path.Combine(baseDir, "Up_Script.sql");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            const string baseDir = "Resources\\SQLScripts\\";
            var filePath = Path.Combine(baseDir, "Down_Script.sql");
        }
    }
}
