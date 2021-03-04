using Example.API.Constants;
using Example.API.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Example.API.Contexts
{
    public sealed class UserContext : DbContext
    {
        #region TABLES

        public DbSet<UserModel> Users { get; set; }

        #endregion TABLES

        #region CONSTRUCTORS

        public UserContext(DbContextOptions<UserContext> contextOptions) : base(contextOptions)
        {
        }

        #endregion CONSTRUCTORS

        #region BUILDERS

        private static void BuildUserTable(ModelBuilder modelBuilder)
        {
            // Table name
            modelBuilder.Entity<UserModel>()
                .ToTable(ContextConstants.UserTableName);

            // Keys and relationships
            modelBuilder.Entity<UserModel>()
                .HasKey(user => user.Id);

            // Conversions and types
            modelBuilder.Entity<UserModel>()
                .Property(user => user.Username)
                .HasColumnType(ContextConstants.userNameColumnType);

            modelBuilder.Entity<UserModel>()
                .Property(user => user.ApiEndPoint);

            modelBuilder.Entity<UserModel>()
                .Property(user => user.PasswordHash)
                .HasColumnType(ContextConstants.passwordColumnType);


            modelBuilder.Entity<UserModel>()
                .Property(user => user.PasswordSalt)
                .HasColumnType(ContextConstants.passwordColumnType);
            // Indices
            modelBuilder.Entity<UserModel>()
                .HasIndex(user => user.Id)
                .IsUnique();
        }

        #endregion BUILDERS

        #region METHODS

        public override void Dispose()
        {
            ChangeTracker.DetectChanges();
            SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            BuildUserTable(modelBuilder);
        }

        #endregion METHODS
    }
}
