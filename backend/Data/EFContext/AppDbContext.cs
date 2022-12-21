using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.EFContext
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() { }
        public AppDbContext(DbContextOptions options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(@"Server=(localdb)\mssqllocaldb;Database=EFProviders.InMemory;Trusted_Connection=True;ConnectRetryCount=0");
            }

            // db migrations
            var connectionString = "Host=general-p1.postgres.database.azure.com;Database=turnik-prod;Username=toto;Password=V76t1eKi4cuy";
            optionsBuilder.UseNpgsql(connectionString);
        }

        public virtual DbSet<PlaygroundEntity> Playgrounds { get; set; }
        public virtual DbSet<UserEntity> Users { get; set; }
        public virtual DbSet<CommentEntity> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PlaygroundEntity>(entity =>
            {
                entity.ToTable("Playground");
                entity.HasKey(r => r.Id);
                entity
                    .HasIndex(r => r.Address);
            });

            modelBuilder.Entity<UserEntity>(entity =>
            {
                entity.ToTable("User");
                entity.HasKey(r => r.Id);
            });

            modelBuilder.Entity<CommentEntity>(entity =>
            {
                entity.ToTable("Comment");
                entity.HasKey(r => r.Id);
            });
        }
    }
}
