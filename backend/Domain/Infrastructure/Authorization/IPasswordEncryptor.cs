namespace Domain.Infrastructure.Authorization
{
    public interface IPasswordEncryptor
    {
        string EncryptPassword(string plainPassword);
        string GetRootPassword();
    }
}
