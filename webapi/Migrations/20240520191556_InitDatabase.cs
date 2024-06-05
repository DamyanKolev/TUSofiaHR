using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class InitDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "addresses",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    street_address = table.Column<string>(type: "text", nullable: false),
                    postal_code = table.Column<string>(type: "text", nullable: false),
                    district = table.Column<string>(type: "text", nullable: false),
                    municipilaty = table.Column<string>(type: "text", nullable: false),
                    region = table.Column<string>(type: "text", nullable: false),
                    populated_place = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_addresses", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "end_months",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    month = table.Column<int>(type: "integer", nullable: false),
                    year = table.Column<int>(type: "integer", nullable: false),
                    is_finished = table.Column<bool>(type: "boolean", nullable: false),
                    creation_date = table.Column<DateOnly>(type: "date", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_end_months", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    created_at = table.Column<DateOnly>(type: "date", nullable: false),
                    normalized_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    concurrency_stamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_roles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sys_administrative_territories",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ekatte = table.Column<string>(type: "text", nullable: false),
                    territory_name = table.Column<string>(type: "text", nullable: false),
                    territory_type = table.Column<string>(type: "text", nullable: false),
                    region_name = table.Column<string>(type: "text", nullable: false),
                    municipality_name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_sys_administrative_territories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sys_contract_document_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    code = table.Column<short>(type: "smallint", nullable: false),
                    document_type = table.Column<string>(type: "character varying(70)", maxLength: 70, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_sys_contract_document_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sys_contract_termination_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    code = table.Column<string>(type: "text", nullable: false),
                    termination_type = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_sys_contract_termination_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sys_contract_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    code = table.Column<string>(type: "text", nullable: false),
                    contract_type = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_sys_contract_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sys_iconomic_activities",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nkid_sector = table.Column<string>(type: "text", nullable: false),
                    nkid_id = table.Column<string>(type: "text", nullable: false),
                    activity_name = table.Column<string>(type: "text", nullable: false),
                    nkid = table.Column<string>(type: "text", nullable: false),
                    tzpb_percent = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_sys_iconomic_activities", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sys_insurance_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    code = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: false),
                    insurance_type = table.Column<string>(type: "text", nullable: false),
                    health_insurance_article40 = table.Column<decimal[]>(type: "numeric[]", nullable: false),
                    doo_withouth_tzpb_insurer = table.Column<decimal[]>(type: "numeric[]", nullable: false),
                    doo_withouth_tzpb_employee = table.Column<decimal[]>(type: "numeric[]", nullable: false),
                    health_insurance_insurer = table.Column<decimal[]>(type: "numeric[]", nullable: false),
                    health_insurance_employee = table.Column<decimal[]>(type: "numeric[]", nullable: false),
                    teacher_pension_fund = table.Column<decimal[]>(type: "numeric[]", nullable: false),
                    professional_pension_fund = table.Column<decimal[]>(type: "numeric[]", nullable: false),
                    universal_pension_insurer = table.Column<decimal[]>(type: "numeric[]", nullable: false),
                    universal_pension_employee = table.Column<decimal[]>(type: "numeric[]", nullable: false),
                    health_insurance = table.Column<decimal[]>(type: "numeric[]", nullable: false),
                    gvrc_fund = table.Column<decimal>(type: "numeric", nullable: false),
                    dod_tax = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_sys_insurance_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sys_payment_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    payment_type = table.Column<string>(type: "text", nullable: false),
                    code = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_sys_payment_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sys_positions",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    position_name = table.Column<string>(type: "text", nullable: false),
                    nkpd = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_sys_positions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    normalized_user_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    normalized_email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    email_confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    password_hash = table.Column<string>(type: "text", nullable: true),
                    security_stamp = table.Column<string>(type: "text", nullable: true),
                    concurrency_stamp = table.Column<string>(type: "text", nullable: true),
                    phone_number = table.Column<string>(type: "text", nullable: true),
                    phone_number_confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    two_factor_enabled = table.Column<bool>(type: "boolean", nullable: false),
                    lockout_end = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    lockout_enabled = table.Column<bool>(type: "boolean", nullable: false),
                    access_failed_count = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "personal_data",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    personal_email = table.Column<string>(type: "text", nullable: false),
                    work_email = table.Column<string>(type: "text", nullable: false),
                    identity_text = table.Column<string>(type: "text", nullable: false),
                    identity_code = table.Column<int>(type: "integer", nullable: false),
                    birth_date = table.Column<DateOnly>(type: "date", nullable: true),
                    gender = table.Column<int>(type: "integer", nullable: true),
                    personal_id_number = table.Column<string>(type: "text", nullable: true),
                    personal_id_issue_date = table.Column<DateOnly>(type: "date", nullable: true),
                    personal_id_issue_by = table.Column<string>(type: "text", nullable: true),
                    address_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_personal_data", x => x.id);
                    table.ForeignKey(
                        name: "fk_personal_data_addresses_address_id",
                        column: x => x.address_id,
                        principalTable: "addresses",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "role_claims",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    role_id = table.Column<int>(type: "integer", nullable: false),
                    claim_type = table.Column<string>(type: "text", nullable: true),
                    claim_value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role_claims", x => x.id);
                    table.ForeignKey(
                        name: "fk_role_claims_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "insurances",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    doo_withouth_tzpb_insurer = table.Column<decimal>(type: "numeric", nullable: false),
                    doo_withouth_tzpb_employee = table.Column<decimal>(type: "numeric", nullable: false),
                    health_insurance = table.Column<decimal>(type: "numeric", nullable: false),
                    health_insurance_article40 = table.Column<decimal>(type: "numeric", nullable: false),
                    health_insurance_insurer = table.Column<decimal>(type: "numeric", nullable: false),
                    health_insurance_employee = table.Column<decimal>(type: "numeric", nullable: false),
                    teacher_pension_fund = table.Column<decimal>(type: "numeric", nullable: false),
                    professional_pension_fund = table.Column<decimal>(type: "numeric", nullable: false),
                    universal_pension_insurer = table.Column<decimal>(type: "numeric", nullable: false),
                    universal_pension_employee = table.Column<decimal>(type: "numeric", nullable: false),
                    insurance_type_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_insurances", x => x.id);
                    table.ForeignKey(
                        name: "fk_insurances_sys_insurance_types_insurance_type_id",
                        column: x => x.insurance_type_id,
                        principalTable: "sys_insurance_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "contracts",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    working_wage = table.Column<decimal>(type: "numeric", nullable: true),
                    work_time = table.Column<int>(type: "integer", nullable: true),
                    annual_leave = table.Column<short>(type: "smallint", nullable: true),
                    additional_clause = table.Column<string>(type: "text", nullable: true),
                    conclusion_date = table.Column<DateOnly>(type: "date", nullable: true),
                    execution_date = table.Column<DateOnly>(type: "date", nullable: false),
                    contract_term = table.Column<DateOnly>(type: "date", nullable: true),
                    additional_agreement_date = table.Column<DateOnly>(type: "date", nullable: true),
                    termination_date = table.Column<DateOnly>(type: "date", nullable: true),
                    change_date = table.Column<DateOnly>(type: "date", nullable: true),
                    contract_type_id = table.Column<int>(type: "integer", nullable: false),
                    sys_position_id = table.Column<int>(type: "integer", nullable: true),
                    sys_iconomic_activity_id = table.Column<int>(type: "integer", nullable: true),
                    document_type_id = table.Column<int>(type: "integer", nullable: false),
                    termination_type_id = table.Column<int>(type: "integer", nullable: true),
                    sys_administrative_territory_id = table.Column<int>(type: "integer", nullable: false),
                    contract_id = table.Column<int>(type: "integer", nullable: true),
                    company_eic = table.Column<string>(type: "text", nullable: false),
                    code_corection = table.Column<short>(type: "smallint", nullable: false),
                    is_terminate = table.Column<bool>(type: "boolean", nullable: true, defaultValue: false),
                    article62_flag = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    is_annex = table.Column<bool>(type: "boolean", nullable: false),
                    creation_date = table.Column<DateOnly>(type: "date", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_contracts", x => x.id);
                    table.ForeignKey(
                        name: "fk_contracts_contracts_contract_id",
                        column: x => x.contract_id,
                        principalTable: "contracts",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_contracts_sys_administrative_territories_sys_administrative",
                        column: x => x.sys_administrative_territory_id,
                        principalTable: "sys_administrative_territories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_contracts_sys_contract_document_types_document_type_id",
                        column: x => x.document_type_id,
                        principalTable: "sys_contract_document_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_contracts_sys_contract_termination_types_termination_type_id",
                        column: x => x.termination_type_id,
                        principalTable: "sys_contract_termination_types",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_contracts_sys_contract_types_contract_type_id",
                        column: x => x.contract_type_id,
                        principalTable: "sys_contract_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_contracts_sys_iconomic_activities_sys_iconomic_activity_id",
                        column: x => x.sys_iconomic_activity_id,
                        principalTable: "sys_iconomic_activities",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_contracts_sys_positions_sys_position_id",
                        column: x => x.sys_position_id,
                        principalTable: "sys_positions",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "positions",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    position_name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    sys_position_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_positions", x => x.id);
                    table.ForeignKey(
                        name: "fk_positions_sys_positions_sys_position_id",
                        column: x => x.sys_position_id,
                        principalTable: "sys_positions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "companies",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    company_name = table.Column<string>(type: "text", nullable: false),
                    company_eic = table.Column<string>(type: "text", nullable: false),
                    user_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_companies", x => x.id);
                    table.ForeignKey(
                        name: "fk_companies_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_claims",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    claim_type = table.Column<string>(type: "text", nullable: true),
                    claim_value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_claims", x => x.id);
                    table.ForeignKey(
                        name: "fk_user_claims_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_logins",
                columns: table => new
                {
                    login_provider = table.Column<string>(type: "text", nullable: false),
                    provider_key = table.Column<string>(type: "text", nullable: false),
                    provider_display_name = table.Column<string>(type: "text", nullable: true),
                    user_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_logins", x => new { x.login_provider, x.provider_key });
                    table.ForeignKey(
                        name: "fk_user_logins_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_roles",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    role_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_roles", x => new { x.user_id, x.role_id });
                    table.ForeignKey(
                        name: "fk_user_roles_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_user_roles_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_tokens",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    login_provider = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_tokens", x => new { x.user_id, x.login_provider, x.name });
                    table.ForeignKey(
                        name: "fk_user_tokens_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "company_employee_taxes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    employee_id = table.Column<int>(type: "integer", nullable: false),
                    sys_payment_type_id = table.Column<int>(type: "integer", nullable: false),
                    disbursement_accrual_date = table.Column<DateOnly>(type: "date", nullable: false),
                    creation_date = table.Column<DateOnly>(type: "date", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_company_employee_taxes", x => x.id);
                    table.ForeignKey(
                        name: "fk_company_employee_taxes_sys_payment_types_sys_payment_type_id",
                        column: x => x.sys_payment_type_id,
                        principalTable: "sys_payment_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "departments",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    department_name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    manager_id = table.Column<int>(type: "integer", nullable: true),
                    parent_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_departments", x => x.id);
                    table.ForeignKey(
                        name: "fk_departments_departments_parent_id",
                        column: x => x.parent_id,
                        principalTable: "departments",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "employees",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    first_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    middle_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    phone_number = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    company_employee_id = table.Column<int>(type: "integer", nullable: false),
                    personal_data_id = table.Column<int>(type: "integer", nullable: false),
                    department_id = table.Column<int>(type: "integer", nullable: true),
                    position_id = table.Column<int>(type: "integer", nullable: true),
                    insurance_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_employees", x => x.id);
                    table.ForeignKey(
                        name: "fk_employees_departments_department_id",
                        column: x => x.department_id,
                        principalTable: "departments",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_employees_insurances_insurance_id",
                        column: x => x.insurance_id,
                        principalTable: "insurances",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_employees_personal_data_personal_data_id",
                        column: x => x.personal_data_id,
                        principalTable: "personal_data",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_employees_positions_position_id",
                        column: x => x.position_id,
                        principalTable: "positions",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "employee_contracts",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    employee_id = table.Column<int>(type: "integer", nullable: false),
                    contract_id = table.Column<int>(type: "integer", nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_employee_contracts", x => x.id);
                    table.ForeignKey(
                        name: "fk_employee_contracts_contracts_contract_id",
                        column: x => x.contract_id,
                        principalTable: "contracts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_employee_contracts_employees_employee_id",
                        column: x => x.employee_id,
                        principalTable: "employees",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "incomes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    employee_id = table.Column<int>(type: "integer", nullable: false),
                    healt_insurance_art40 = table.Column<decimal>(type: "numeric", nullable: false),
                    total_insurance = table.Column<decimal>(type: "numeric", nullable: false),
                    health_insurance = table.Column<decimal>(type: "numeric", nullable: false),
                    gross_remuneration = table.Column<decimal>(type: "numeric", nullable: false),
                    bonus_income = table.Column<decimal>(type: "numeric", nullable: false),
                    additional_income = table.Column<decimal>(type: "numeric", nullable: false),
                    creation_date = table.Column<DateOnly>(type: "date", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_incomes", x => x.id);
                    table.ForeignKey(
                        name: "fk_incomes_employees_employee_id",
                        column: x => x.employee_id,
                        principalTable: "employees",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "schedules",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    employee_id = table.Column<int>(type: "integer", nullable: false),
                    insurance_days = table.Column<short>(type: "smallint", nullable: false),
                    insurance_experience_days = table.Column<short>(type: "smallint", nullable: false),
                    incapacity_days = table.Column<short>(type: "smallint", nullable: false),
                    childcare_days = table.Column<short>(type: "smallint", nullable: false),
                    without_insurance_days = table.Column<short>(type: "smallint", nullable: false),
                    unpaid_leave_days = table.Column<short>(type: "smallint", nullable: false),
                    paid_incapacity_days = table.Column<short>(type: "smallint", nullable: false),
                    worked_hours = table.Column<short>(type: "smallint", nullable: false),
                    overtime_hours = table.Column<short>(type: "smallint", nullable: false),
                    creation_date = table.Column<DateOnly>(type: "date", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_schedules", x => x.id);
                    table.ForeignKey(
                        name: "fk_schedules_employees_employee_id",
                        column: x => x.employee_id,
                        principalTable: "employees",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "id", "access_failed_count", "concurrency_stamp", "email", "email_confirmed", "lockout_enabled", "lockout_end", "normalized_email", "normalized_user_name", "password_hash", "phone_number", "phone_number_confirmed", "security_stamp", "two_factor_enabled", "user_name" },
                values: new object[] { 1, 0, "d075e915-6254-4f7a-a3e0-bb69a8343302", "damkolev@test.net", false, false, null, "DAMKOLEV@TEST.NET", "DAMYAN", "AQAAAAIAAYagAAAAEIby5lv2SU9dEEy+s1RSWyAJWPXrD7Qgo+iGerDZo5jCSkzsEpVUEMRl18n91wMomw==", null, false, "4fda8d16-9c0b-4e0c-8f5e-b1a67fb8b147", false, "Damyan" });

            migrationBuilder.CreateIndex(
                name: "ix_companies_user_id",
                table: "companies",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_company_employee_taxes_employee_id",
                table: "company_employee_taxes",
                column: "employee_id");

            migrationBuilder.CreateIndex(
                name: "ix_company_employee_taxes_sys_payment_type_id",
                table: "company_employee_taxes",
                column: "sys_payment_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_contracts_contract_id",
                table: "contracts",
                column: "contract_id");

            migrationBuilder.CreateIndex(
                name: "ix_contracts_contract_type_id",
                table: "contracts",
                column: "contract_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_contracts_document_type_id",
                table: "contracts",
                column: "document_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_contracts_sys_administrative_territory_id",
                table: "contracts",
                column: "sys_administrative_territory_id");

            migrationBuilder.CreateIndex(
                name: "ix_contracts_sys_iconomic_activity_id",
                table: "contracts",
                column: "sys_iconomic_activity_id");

            migrationBuilder.CreateIndex(
                name: "ix_contracts_sys_position_id",
                table: "contracts",
                column: "sys_position_id");

            migrationBuilder.CreateIndex(
                name: "ix_contracts_termination_type_id",
                table: "contracts",
                column: "termination_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_departments_manager_id",
                table: "departments",
                column: "manager_id");

            migrationBuilder.CreateIndex(
                name: "ix_departments_parent_id",
                table: "departments",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "ix_employee_contracts_contract_id",
                table: "employee_contracts",
                column: "contract_id");

            migrationBuilder.CreateIndex(
                name: "ix_employee_contracts_employee_id",
                table: "employee_contracts",
                column: "employee_id");

            migrationBuilder.CreateIndex(
                name: "ix_employees_department_id",
                table: "employees",
                column: "department_id");

            migrationBuilder.CreateIndex(
                name: "ix_employees_insurance_id",
                table: "employees",
                column: "insurance_id");

            migrationBuilder.CreateIndex(
                name: "ix_employees_personal_data_id",
                table: "employees",
                column: "personal_data_id");

            migrationBuilder.CreateIndex(
                name: "ix_employees_position_id",
                table: "employees",
                column: "position_id");

            migrationBuilder.CreateIndex(
                name: "ix_incomes_employee_id",
                table: "incomes",
                column: "employee_id");

            migrationBuilder.CreateIndex(
                name: "ix_insurances_insurance_type_id",
                table: "insurances",
                column: "insurance_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_personal_data_address_id",
                table: "personal_data",
                column: "address_id");

            migrationBuilder.CreateIndex(
                name: "ix_positions_sys_position_id",
                table: "positions",
                column: "sys_position_id");

            migrationBuilder.CreateIndex(
                name: "ix_role_claims_role_id",
                table: "role_claims",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "roles",
                column: "normalized_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_schedules_employee_id",
                table: "schedules",
                column: "employee_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_claims_user_id",
                table: "user_claims",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_logins_user_id",
                table: "user_logins",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_roles_role_id",
                table: "user_roles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "users",
                column: "normalized_email");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "users",
                column: "normalized_user_name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_company_employee_taxes_employees_employee_id",
                table: "company_employee_taxes",
                column: "employee_id",
                principalTable: "employees",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_departments_employees_manager_id",
                table: "departments",
                column: "manager_id",
                principalTable: "employees",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_departments_employees_manager_id",
                table: "departments");

            migrationBuilder.DropTable(
                name: "companies");

            migrationBuilder.DropTable(
                name: "company_employee_taxes");

            migrationBuilder.DropTable(
                name: "employee_contracts");

            migrationBuilder.DropTable(
                name: "end_months");

            migrationBuilder.DropTable(
                name: "incomes");

            migrationBuilder.DropTable(
                name: "role_claims");

            migrationBuilder.DropTable(
                name: "schedules");

            migrationBuilder.DropTable(
                name: "user_claims");

            migrationBuilder.DropTable(
                name: "user_logins");

            migrationBuilder.DropTable(
                name: "user_roles");

            migrationBuilder.DropTable(
                name: "user_tokens");

            migrationBuilder.DropTable(
                name: "sys_payment_types");

            migrationBuilder.DropTable(
                name: "contracts");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "sys_administrative_territories");

            migrationBuilder.DropTable(
                name: "sys_contract_document_types");

            migrationBuilder.DropTable(
                name: "sys_contract_termination_types");

            migrationBuilder.DropTable(
                name: "sys_contract_types");

            migrationBuilder.DropTable(
                name: "sys_iconomic_activities");

            migrationBuilder.DropTable(
                name: "employees");

            migrationBuilder.DropTable(
                name: "departments");

            migrationBuilder.DropTable(
                name: "insurances");

            migrationBuilder.DropTable(
                name: "personal_data");

            migrationBuilder.DropTable(
                name: "positions");

            migrationBuilder.DropTable(
                name: "sys_insurance_types");

            migrationBuilder.DropTable(
                name: "addresses");

            migrationBuilder.DropTable(
                name: "sys_positions");
        }
    }
}
