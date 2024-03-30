using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using webapi.Extensions;
using webapi.Models.Auth;
using webapi.Models.HR;
using webapi.Models.System;
using webapi.Models.Views;

namespace webapi
{
    public class DatabaseContext : IdentityDbContext<User, Role, int>
    {
        //Employee Tables
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<PersonalData> PersonalDatas { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<EmployeeContracts> EmployeeContracts { get; set; }
        public DbSet<Insurance> Insurances { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Schedule> Schedules { get; set; }



        //System Tables
        public DbSet<SysAdministrativeTerritory> SysAdministrativeTerritories { get; set; }
        public DbSet<SysContractTerminationType> SysContractTerminationTypes { get; set; }
        public DbSet<SysContractType> SysContractTypes { get; set; }
        public DbSet<SysIconomicActivity> SysIconomicActivities { get; set; }
        public DbSet<SysPosition> SysPositions { get; set; }
        public DbSet<SysContractDocumentType> SysContractDocumentTypes { get; set; }
        public DbSet<SysInsuranceType> SysInsuranceTypes { get; set; }
        public DbSet<SysPaymentType> SysPaymentTypes { get; set; }


        //Table Views
        public DbSet<EmployeeV> EmployeeV { get; set; }
        public DbSet<ContractV> ContractV { get; set; }
        public DbSet<AnnexV> AnnexV { get; set; }
        public DbSet<InsuranceV> InsuranceV { get; set; }



        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) 
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Seed();
            builder.UpdateIdentityTablesNames();

            builder.Entity<EmployeeV>(v =>
            {
                v.HasNoKey();
                v.ToView("employee_v");
            });

            builder.Entity<ContractV>(v =>
            {
                v.HasNoKey();
                v.ToView("contract_v");
            });

            builder.Entity<AnnexV>(v =>
            {
                v.HasNoKey();
                v.ToView("annex_v");
            });

            builder.Entity<InsuranceV>(v =>
            {
                v.HasNoKey();
                v.ToView("insurance_v");
            });
        }
    }
}
