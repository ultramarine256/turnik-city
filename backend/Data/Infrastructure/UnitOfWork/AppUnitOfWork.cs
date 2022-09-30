using Data.Infrastructure.ContextManager;
using Microsoft.EntityFrameworkCore.Storage;

namespace Data.Infrastructure.UnitOfWork
{
    public class AppUnitOfWork : IAppUnitOfWork
    {
        private IContextManager _dbContextManager;
        private IDbContextTransaction _currentTransaction;
        private Action<AppUnitOfWork> _disposeAction;
        private bool _isTransactionCommitted;

        public AppUnitOfWork(IContextManager dbContextManager, bool useTransaction, Action<AppUnitOfWork> disposeActionAction)
        {
            _dbContextManager = dbContextManager;
            _disposeAction = disposeActionAction;
            _dbContextManager.BuildOrCurrentContext();
            if (useTransaction)
            {
                _currentTransaction = _dbContextManager.CurrentContext.Database.BeginTransaction();
            }
        }

        public async Task CompleteAsync()
        {
            await _dbContextManager.CurrentContext.SaveChangesAsync();
            if (_currentTransaction != null)
            {
                _isTransactionCommitted = true;
                _currentTransaction.Commit();
            }
        }

        public async Task PushChangesAsync()
        {
            if (_currentTransaction == null)
                throw new Exception("Push to database in not transaction mode is not avaliable. Try set useTransaction=true");
            await _dbContextManager.CurrentContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            if (_currentTransaction != null)
            {
                if (!_isTransactionCommitted)
                {
                    _currentTransaction.Rollback();
                }
                _currentTransaction.Dispose();
            }
            _disposeAction(this);
        }
    }
}
