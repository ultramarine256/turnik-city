using Data.Entities.Abstract;

namespace Data.Entities
{
    public class CommentEntity : Entity<int>
    {
        public int PlaygroundId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedUtc { get; set; }
        public string? Text { get; set; }
    }
}
