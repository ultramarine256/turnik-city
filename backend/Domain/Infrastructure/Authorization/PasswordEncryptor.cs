

using Domain.Infrastructure.Extensions;

namespace Domain.Infrastructure.Authorization
{
    public class PasswordEncryptor : IPasswordEncryptor
    {
        public string EncryptionKey { get; }

        public PasswordEncryptor(string encryptionKey)
        {
            EncryptionKey = encryptionKey;
        }

        public string EncryptPassword(string plainPassword)
            => EncryptionExtensions.Encrypt(plainPassword, EncryptionKey);
    }
}
