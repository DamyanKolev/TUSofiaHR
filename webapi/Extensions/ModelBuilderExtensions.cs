using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using webapi.Models.Auth;
using webapi.Models.HR;
using webapi.Models.System;

namespace webapi.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void SeedSytemTables(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SysAdministrativeTerritory>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysAdministrativeTerritory>("SysAdministrativeTerritories.csv")
                );
            modelBuilder.Entity<SysContractTerminationType>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysContractTerminationType>("SysContractTerminationTypes.csv")
                );
            modelBuilder.Entity<SysContractType>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysContractType>("SysContractTypes.csv")
                );
            modelBuilder.Entity<SysIconomicActivity>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysIconomicActivity>("SysIconomicActivities.csv")
                );
            modelBuilder.Entity<SysPosition>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysPosition>("SysPositions.csv")
                );
            modelBuilder.Entity<SysContractDocumentType>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysContractDocumentType>("SysContractDocumentTypes.csv")
                );
            //modelBuilder.Entity<SysInsuranceType>().HasData(
            //        CSVFileProcessor.ParseCSVToList<SysInsuranceType>("SysInsuranceTypes.csv")
            //    );
            modelBuilder.Entity<SysPaymentType>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysPaymentType>("SysPaymentTypes.csv")
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
