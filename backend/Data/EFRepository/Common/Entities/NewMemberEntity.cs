namespace Data.EFRepository.Common.Entities
{
    public class NewMemberEntity
    {
        public string Slug { get; set; }
        public string ImageUrl { get; set; }
        public string FullName { get; set; }
        public string? InstagramId { get; set; }
        public DateTime? CreatedUtc { get; set; }
    }
}
