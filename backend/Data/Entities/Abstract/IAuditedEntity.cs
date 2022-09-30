namespace Data.Entities.Abstract
{
    /// <summary>
    /// Implements a base class for full-audited entities.
    /// </summary>
    public interface IAuditedEntity
    {
        public DateTime? CreatedUtc { get; set; }
        /// <inheritdoc />
        public string? CreatedBy { get; set; }
    }
}
