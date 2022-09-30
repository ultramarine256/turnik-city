namespace Data.Infrastructure.UnitOfWork
{
    /// <summary>
    /// Is used as Unit of Work for App
    /// </summary>
    public interface IAppUnitOfWork : IDisposable
    {
        /// <summary>
        /// Is used to save changes to storage and commit transaction in transaction mode.
        /// </summary>
        /// <returns>task</returns>
        Task CompleteAsync();

        /// <summary>
        /// Is used to save changes to storage, but not commit transaction. If mode is not transactional throws exception.
        /// </summary>
        /// <returns>task</returns>
        Task PushChangesAsync();
    }
}
