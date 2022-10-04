using Azure;
using Azure.Core;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace Data.ThirdParty.Storage
{
    public class StorageService : IStorageService
    {
        protected readonly BlobServiceClient BlobServiceClient;
        protected readonly BlobContainerClient СontainerClient;

        public StorageService(string? accountName, string? storageKey, string? containerName)
        {
            var uri = new Uri($"https://{accountName}.blob.core.windows.net");
            var creds = new StorageSharedKeyCredential(accountName, storageKey);
            BlobServiceClient = new BlobServiceClient(uri, creds);
            СontainerClient = BlobServiceClient.GetBlobContainerClient(containerName);
        }

        public async Task<Uri> UploadFile(Stream stream, string fileName, string contentType = "application/octet-stream") // binary
        {
            var blob = СontainerClient.GetBlobClient(fileName);
            if (blob.Exists())
            { return blob.Uri; }
            await blob.UploadAsync(stream);
            await blob.SetHttpHeadersAsync(new BlobHttpHeaders { ContentType = contentType });
            return blob.Uri;
        }

        public Task<Uri> UploadFile(byte[] content, string blobName, string contentType = "binary")
            => UploadFile(new MemoryStream(content), blobName, contentType);

        public Task<Uri> UploadImage(string imageBase64)
            => UploadFile(
                Convert.FromBase64String(imageBase64),
                Guid.NewGuid().ToString("N"),
                "image/jpeg");
        public Task<Response<bool>> RemoveFile(string fileName)
            => СontainerClient.GetBlobClient(fileName).DeleteIfExistsAsync();

        public static Stream GenerateStreamFromString(string input)
        {
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(input);
            writer.Flush();
            stream.Position = 0;
            return stream;
        }
    }
}