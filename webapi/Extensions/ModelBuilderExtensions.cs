using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using webapi.Models.Auth;
using webapi.Models.System;

namespace webapi.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SysAdministrativeTerritory>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysAdministrativeTerritory>("Sys_Administrative_Territories.csv")
                );
            modelBuilder.Entity<SysContractTerminationType>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysContractTerminationType>("Sys_Contract_Termination_Types.csv")
                );
            modelBuilder.Entity<SysContractType>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysContractType>("Sys_Contract_Types.csv")
                );
            modelBuilder.Entity<SysIconomicActivity>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysIconomicActivity>("Sys_Iconomic_Activities.csv")
                );
            modelBuilder.Entity<SysPosition>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysPosition>("Sys_Positions.csv")
                );
            modelBuilder.Entity<SysContractDocumentType>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysContractDocumentType>("Sys_Contract_Document_Types.csv")
                );
        }

        public static void UpdateIdentityTablesNames(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(b =>
            {
                b.ToTable("users");
            });

            modelBuilder.Entity<IdentityUserClaim<int>>(b =>
            {
                b.ToTable("user_claims");
            });

            modelBuilder.Entity<IdentityUserLogin<int>>(b =>
            {
                b.ToTable("user_logins");
            });

            modelBuilder.Entity<IdentityUserToken<int>>(b =>
            {
                b.ToTable("user_tokens");
            });

            modelBuilder.Entity<Role>(b =>
            {
                b.ToTable("roles");
            });

            modelBuilder.Entity<IdentityRoleClaim<int>>(b =>
            {
                b.ToTable("role_claims");
            });

            modelBuilder.Entity<IdentityUserRole<int>>(b =>
            {
                b.ToTable("user_roles");
            });
        }
    }
}
