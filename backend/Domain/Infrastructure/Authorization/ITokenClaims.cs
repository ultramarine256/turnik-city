namespace Domain.Infrastructure.Authorization
{
    public interface ITokenClaims
    {
        public string Email { get; }
        public string FullName { get; }
        public string UserRole { get; }
        public IList<string> Permissions { get; }
    }
}
