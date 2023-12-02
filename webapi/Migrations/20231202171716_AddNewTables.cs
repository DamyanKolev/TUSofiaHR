using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class AddNewTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Employees",
                newName: "MiddleName");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "PersonalDatas",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "BirthDate",
                table: "PersonalDatas",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "PersonalDatas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateOnly>(
                name: "PersonalIdIssueDate",
                table: "PersonalDatas",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<bool>(
                name: "Article132Flag",
                table: "Employees",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "CompanyEmployeeId",
                table: "Employees",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Employees",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateOnly>(
                name: "DateOfComapanyChange",
                table: "Employees",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "DepartmentId",
                table: "Employees",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "ManagerId",
                table: "Employees",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "OldCompanyId",
                table: "Employees",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PersonalDataId",
                table: "Employees",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Employees",
                type: "character varying(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "PositionId",
                table: "Employees",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateOnly>(
                name: "AdditionalAgreementDate",
                table: "Contracts",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "AdministrativeTerritoryId",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<short>(
                name: "AnnualLeave",
                table: "Contracts",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddColumn<bool>(
                name: "Article62Flag",
                table: "Contracts",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateOnly>(
                name: "ChangeDate",
                table: "Contracts",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<short>(
                name: "CodeCorection",
                table: "Contracts",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateOnly>(
                name: "ContractTerm",
                table: "Contracts",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "ContractTypeId",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateOnly>(
                name: "ExecutionnDate",
                table: "Contracts",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "IconomicActivityId",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PositionId",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateOnly>(
                name: "TerminationDate",
                table: "Contracts",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "TerminationTypeId",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "AspNetUsers",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(256)",
                oldMaxLength: 256);

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "AspNetUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "AspNetUsers",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(256)",
                oldMaxLength: 256);

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DepartmentName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Positions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PositionName = table.Column<string>(type: "text", nullable: false),
                    MinSalary = table.Column<decimal>(type: "numeric", nullable: false),
                    MaxSalary = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Positions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SysAdministrativeTerritories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Ekatte = table.Column<string>(type: "text", nullable: true),
                    TerritoryName = table.Column<string>(type: "text", nullable: true),
                    TerritoryType = table.Column<string>(type: "text", nullable: true),
                    RegionName = table.Column<string>(type: "text", nullable: true),
                    MunicipalityName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SysAdministrativeTerritories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SysContractTerminationTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "text", nullable: true),
                    TerminationType = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SysContractTerminationTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SysContractTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "text", nullable: true),
                    ContractType = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SysContractTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SysIconomicActivities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nkid = table.Column<string>(type: "text", nullable: true),
                    NkidIdText = table.Column<string>(type: "text", nullable: true),
                    ActivityName = table.Column<string>(type: "text", nullable: true),
                    NkidId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SysIconomicActivities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SysPositions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NPKDBase = table.Column<string>(type: "text", nullable: true),
                    NPKDSlave = table.Column<string>(type: "text", nullable: true),
                    PositionName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SysPositions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StreetAddress = table.Column<string>(type: "text", nullable: false),
                    PostalCode = table.Column<string>(type: "text", nullable: false),
                    TerritoryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Addresses_SysAdministrativeTerritories_TerritoryId",
                        column: x => x.TerritoryId,
                        principalTable: "SysAdministrativeTerritories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonalDatas_AddressId",
                table: "PersonalDatas",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_CompanyId",
                table: "Employees",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentId",
                table: "Employees",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ManagerId",
                table: "Employees",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PersonalDataId",
                table: "Employees",
                column: "PersonalDataId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PositionId",
                table: "Employees",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_AdministrativeTerritoryId",
                table: "Contracts",
                column: "AdministrativeTerritoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_CompanyId",
                table: "Contracts",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_ContractTypeId",
                table: "Contracts",
                column: "ContractTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_IconomicActivityId",
                table: "Contracts",
                column: "IconomicActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_PositionId",
                table: "Contracts",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_TerminationTypeId",
                table: "Contracts",
                column: "TerminationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_TerritoryId",
                table: "Addresses",
                column: "TerritoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_Companies_CompanyId",
                table: "Contracts",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_SysAdministrativeTerritories_AdministrativeTerrit~",
                table: "Contracts",
                column: "AdministrativeTerritoryId",
                principalTable: "SysAdministrativeTerritories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_SysContractTerminationTypes_TerminationTypeId",
                table: "Contracts",
                column: "TerminationTypeId",
                principalTable: "SysContractTerminationTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_SysContractTypes_ContractTypeId",
                table: "Contracts",
                column: "ContractTypeId",
                principalTable: "SysContractTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_SysIconomicActivities_IconomicActivityId",
                table: "Contracts",
                column: "IconomicActivityId",
                principalTable: "SysIconomicActivities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_SysPositions_PositionId",
                table: "Contracts",
                column: "PositionId",
                principalTable: "SysPositions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Companies_CompanyId",
                table: "Employees",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_DepartmentId",
                table: "Employees",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Employees_ManagerId",
                table: "Employees",
                column: "ManagerId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_PersonalDatas_PersonalDataId",
                table: "Employees",
                column: "PersonalDataId",
                principalTable: "PersonalDatas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Positions_PositionId",
                table: "Employees",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalDatas_Addresses_AddressId",
                table: "PersonalDatas",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_Companies_CompanyId",
                table: "Contracts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_SysAdministrativeTerritories_AdministrativeTerrit~",
                table: "Contracts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_SysContractTerminationTypes_TerminationTypeId",
                table: "Contracts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_SysContractTypes_ContractTypeId",
                table: "Contracts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_SysIconomicActivities_IconomicActivityId",
                table: "Contracts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_SysPositions_PositionId",
                table: "Contracts");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Companies_CompanyId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_DepartmentId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Employees_ManagerId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_PersonalDatas_PersonalDataId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Positions_PositionId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonalDatas_Addresses_AddressId",
                table: "PersonalDatas");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Positions");

            migrationBuilder.DropTable(
                name: "SysContractTerminationTypes");

            migrationBuilder.DropTable(
                name: "SysContractTypes");

            migrationBuilder.DropTable(
                name: "SysIconomicActivities");

            migrationBuilder.DropTable(
                name: "SysPositions");

            migrationBuilder.DropTable(
                name: "SysAdministrativeTerritories");

            migrationBuilder.DropIndex(
                name: "IX_PersonalDatas_AddressId",
                table: "PersonalDatas");

            migrationBuilder.DropIndex(
                name: "IX_Employees_CompanyId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_DepartmentId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_ManagerId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_PersonalDataId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_PositionId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_AdministrativeTerritoryId",
                table: "Contracts");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_CompanyId",
                table: "Contracts");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_ContractTypeId",
                table: "Contracts");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_IconomicActivityId",
                table: "Contracts");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_PositionId",
                table: "Contracts");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_TerminationTypeId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "PersonalDatas");

            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "PersonalDatas");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "PersonalDatas");

            migrationBuilder.DropColumn(
                name: "PersonalIdIssueDate",
                table: "PersonalDatas");

            migrationBuilder.DropColumn(
                name: "Article132Flag",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "CompanyEmployeeId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DateOfComapanyChange",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "OldCompanyId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PersonalDataId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "AdditionalAgreementDate",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "AdministrativeTerritoryId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "AnnualLeave",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "Article62Flag",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "ChangeDate",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "CodeCorection",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "ContractTerm",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "ContractTypeId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "ExecutionnDate",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "IconomicActivityId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "TerminationDate",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "TerminationTypeId",
                table: "Contracts");

            migrationBuilder.RenameColumn(
                name: "MiddleName",
                table: "Employees",
                newName: "LastName");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "AspNetUsers",
                type: "character varying(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "AspNetUsers",
                type: "character varying(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(256)",
                oldMaxLength: 256,
                oldNullable: true);
        }
    }
}
