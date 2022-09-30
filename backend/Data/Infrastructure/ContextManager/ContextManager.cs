using Data.EFContext;

namespace Data.Infrastructure.ContextManager
{
    public class ContextManager : IContextManager
    {
        private AppDbContext _context;
        private readonly object _syncRoot = new object();

        protected IServiceProvider ServiceProvider { get; }

        public ContextManager(IServiceProvider serviceProvider)
        {
            ServiceProvider = serviceProvider;
        }

        /// <summary>
        /// Return current DB context associated with current thread context. If current DBContext is not set then thow exception
        /// </summary>
        public AppDbContext CurrentContext
        {
            get
            {
                var result = _context;
                if (result == null)
                {
                    throw new Exception("With the current logical flow is not associated DBcontext. Use BuildContext() first.");
                }
                else
                {
                    return result;
                }
            }
        }

        /// <summary>
        /// Build new DB context and bind it to cuurent thead context. If DBContext already esist throw exception.
        /// </summary>
        public void BuildContext()
        {
            lock (_syncRoot)
            {
                if (_context != null)
                {
                    throw new Exception("With the current flow is already associated logical data context.");
                }
                else
                {
                    _context = CreateContext();
                }
            }
        }

        /// <summary>
        /// Dispose current thread associated context. 
        /// </summary>
        public void DisposeContext()
        {
            lock (_syncRoot)
            {
                if (_context == null)
                    throw new Exception("With the current logical flow is not associated DBcontext. Nothing to dispose");
                else
                {
                    _context.Dispose();
                    _context = null;
                }
            }
        }

        /// <summary>
        /// If DbContext exist in current thread context, then return it else create new context and associate it with thead.
        /// </summary>
        /// <returns></returns>
        public AppDbContext BuildOrCurrentContext()
        {
            return BuildOrCurrentContext(out var stub);
        }

        public AppDbContext BuildOrCurrentContext(out bool createdNew)
        {
            lock (_syncRoot)
            {
                if (_context == null)
                {
                    _context = CreateContext();
                    createdNew = true;
                }
                else
                {
                    createdNew = false;
                }
                return _context;
            }
        }

        public AppDbContext BuildNewContext()
        {
            return CreateContext();
        }

        private AppDbContext CreateContext()
        {
            return (AppDbContext)ServiceProvider.GetService(typeof(AppDbContext));
        }
    }
}
