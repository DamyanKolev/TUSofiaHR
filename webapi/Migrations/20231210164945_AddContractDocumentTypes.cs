using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class AddContractDocumentTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "sysContractDocumentTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<short>(type: "smallint", nullable: false),
                    DocumentType = table.Column<string>(type: "character varying(70)", maxLength: 70, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sysContractDocumentTypes", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "sysContractDocumentTypes",
                columns: new[] { "Id", "Code", "DocumentType" },
                values: new object[,]
                {
                    { 1, (short)0, "договор, действащ към 1.01.2003 г." },
                    { 2, (short)1, "договор, сключен след 1.01.2003 г." },
                    { 3, (short)2, "промяна на работното място" },
                    { 4, (short)3, "прекратяване след 1.01.2003 г. на регистриран договор" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "sysContractDocumentTypes");
        }
    }
}
