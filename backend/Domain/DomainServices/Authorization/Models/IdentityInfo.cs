namespace Domain.DomainServices.Authorization.Models
{
    public class IdentityInfo
    {
        public string Email { get; set; }
        public string ImageUrl { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }
        public IList<string> Permissions { get; set; }

        public IdentityInfo(
            string email,
            string imageUrl,
            string fullName,
            string role,
            IList<string> permissions)
        {
            Email = email;
            ImageUrl = imageUrl;
            FullName = fullName;
            Role = role;
            Permissions = permissions;
        }
    }
}
