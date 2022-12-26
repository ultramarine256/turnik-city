using Data.Entities.Abstract;

namespace Data.Entities
{
    public class UserEntity : Entity<int>, IUpdatableFrom<UserEntity>
    {
        public string Email { get; set; }
        public string? ImageUrl { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? InstagramId { get; set; }
        public string? TelegramId { get; set; }

        public string Role { get; set; }
        public string PasswordHash { get; set; }

        public DateTime? CreatedUtc { get; set; }

        public void UpdateFrom(UserEntity actualEntity) => throw new NotImplementedException();
    }
}
