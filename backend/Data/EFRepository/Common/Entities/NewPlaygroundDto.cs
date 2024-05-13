namespace Data.EFRepository.Common.Entities
{
    public class NewPlaygroundEntity
    {
        public string Slug { get; set; }
        public string? Title { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime? CreatedUtc { get; set; }
        public string? CreatedBy { get; set; }
        public string? City { get; set; }
    }
}
