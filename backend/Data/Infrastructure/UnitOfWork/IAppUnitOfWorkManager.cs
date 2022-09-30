namespace Data.Infrastructure.UnitOfWork
{
    /// <summary>
    /// Is used to manage Unit of Work <see cref="IAppUnitOfWork"/>
    /// </summary>
    public interface IAppUnitOfWorkManager
    {
        /// <summary>
        /// Is used to return current unit of work. If unit of work was not started returns null.
        /// </summary>
        IAppUnitOfWork Current { get; }

        /// <summary>
        /// Is used to get current or create new unit of work. 
        /// </summary>
        /// <param name="useTransaction">use transaction mode</param>
        /// <returns>unit of work</returns>
        IAppUnitOfWork CurrentOrCreateNew(bool useTransaction = true);

        /// <summary>
        /// Is used to get current or create new unit of work. 
        /// </summary>
        /// <param name="newCreated"></param>
        /// <param name="useTransaction"></param>
        /// <returns>unit of work</returns>
        IAppUnitOfWork CurrentOrCreateNew(out bool newCreated, bool useTransaction = true);
    }
}
