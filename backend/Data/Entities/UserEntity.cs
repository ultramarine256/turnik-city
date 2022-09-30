using Data.Entities.Abstract;

namespace Data.Entities
{
    public class UserEntity : Entity<int>, IUpdatableFrom<UserEntity>
    {
        public string Email { get; set; }
        public string ImageUrl { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }

        public string Role { get; set; }
        public string PasswordHash { get; set; }

        public void UpdateFrom(UserEntity actualEntity) => throw new NotImplementedException();
    }
}
