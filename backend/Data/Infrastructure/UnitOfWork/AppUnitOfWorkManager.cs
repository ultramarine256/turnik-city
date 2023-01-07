using Data.Infrastructure.ContextManager;

namespace Data.Infrastructure.UnitOfWork
{
    public class AppUnitOfWorkManager : IAppUnitOfWorkManager
    {
        private readonly object _syncRoot = new object();
        private AppUnitOfWork _currentUow;
        private IContextManager DbContextManager { get; }
        public IAppUnitOfWork Current => _currentUow;

        public AppUnitOfWorkManager(IContextManager dbContextManager)
        {
            DbContextManager = dbContextManager;
        }

        public IAppUnitOfWork CurrentOrCreateNew(bool useTransaction = true)
            => CurrentOrCreateNew(out _, useTransaction);

        public IAppUnitOfWork CurrentOrCreateNew(out bool newCreated, bool useTransaction = true)
        {
            lock (_syncRoot)
            {
                if (_currentUow == null)
                {
                    newCreated = true;
                    _currentUow = new AppUnitOfWork(DbContextManager, useTransaction, DisposeUnitOfWork);
                }
                else
                {
                    newCreated = false;
                }
                return _currentUow;
            }
        }

        private void DisposeUnitOfWork(AppUnitOfWork uow)
        {
            lock (_syncRoot)
            {
                DbContextManager.DisposeContext();
                if (uow == _currentUow)
                {
                    _currentUow = null;
                }
            }
        }
    }
}
