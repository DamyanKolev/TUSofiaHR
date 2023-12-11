using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateContractTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DocumentTypeId",
                table: "Contracts",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_DocumentTypeId",
                table: "Contracts",
                column: "DocumentTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_sysContractDocumentTypes_DocumentTypeId",
                table: "Contracts",
                column: "DocumentTypeId",
                principalTable: "sysContractDocumentTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_sysContractDocumentTypes_DocumentTypeId",
                table: "Contracts");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_DocumentTypeId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "DocumentTypeId",
                table: "Contracts");
        }
    }
}
