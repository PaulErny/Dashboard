using System;
using Microsoft.EntityFrameworkCore;
using Example.API.Models;

namespace Example.API.Contexts
{
    public class ServiceContext : DbContext
    {
        #region TABLES

        public DbSet<ServiceModel> service { get; set; }
        public DbSet<WidgetModel> widgets { get; set; }
        public DbSet<Params> Params { get; set; }

        #endregion TABLES

        #region CONSTRUCTORS

        public ServiceContext(DbContextOptions contextOptions) : base(contextOptions)
        {
        }

        #endregion CONSTRUCTOR

        #region BUILDERS

        private static void BuildServiceTable(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WidgetModel>()
                .HasOne(w => w.serviceModel)
                .WithMany(s => s.widgets)
                .HasForeignKey(w => w.modelId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
            modelBuilder.Entity<Params>()
                .HasOne(p => p.widget)
                .WithMany(w => w.@params)
                .HasForeignKey(p => p.widgetId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        }

        public override void Dispose()
        {
            ChangeTracker.DetectChanges();
            SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            BuildServiceTable(modelBuilder);
        }

        #endregion BUILDERS
    }
}
