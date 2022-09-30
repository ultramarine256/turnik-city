namespace Data.ThirdParty.Storage
{
    public class StorageServiceMock : IStorageService
    {
        public Task<Uri> UploadFile(byte[] content, string blobName, string contentType)
        {
            return Task.FromResult(new Uri(contentType));
        }

        public Task<bool> RemoveFile(string fileName)
        {
            return Task.FromResult(true);
        }

        public Task<Uri> UploadImage(string imageBase64)
            => UploadFile(
                Convert.FromBase64String(imageBase64),
                Guid.NewGuid().ToString("N"),
                "image/jpeg");

        public string PersonalizedPlaceholder(string firstLetter, string secondLetter)
            => "";

        public bool IsImageUrlAvatar(string url)
            => url.Contains("ui-avatars.com");
    }
}
