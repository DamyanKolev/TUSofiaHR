using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class AddViewsAndSeedSysTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            const string baseDir = "Resources\\SQLScripts\\";
            var sqlFile = Path.Combine(baseDir, "Init_Up.sql");
            migrationBuilder.Sql(File.ReadAllText(sqlFile));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            const string baseDir = "Resources\\SQLScripts\\";
            var sqlFile = Path.Combine(baseDir, "Init_Down.sql");
            migrationBuilder.Sql(File.ReadAllText(sqlFile));
        }
    }
}
