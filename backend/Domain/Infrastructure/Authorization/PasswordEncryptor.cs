using Domain.Infrastructure.Extensions;

namespace Domain.Infrastructure.Authorization
{
    public class PasswordEncryptor : IPasswordEncryptor
    {
        public string EncryptionKey { get; }
        public string RootPassword { get; }

        public PasswordEncryptor(string encryptionKey, string rootPassword)
        {
            EncryptionKey = encryptionKey;
            RootPassword = rootPassword;
        }

        public string GetRootPassword()
            => RootPassword;

        public string EncryptPassword(string plainPassword)
            => EncryptionExtensions.Encrypt(plainPassword, EncryptionKey);
    }
}
