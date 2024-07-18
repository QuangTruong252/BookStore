using ASPCoreAPI.Data;
using ASPCoreAPI.Interfaces;
using ASPCoreAPI.Repositories;

namespace ASPCoreAPI.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly BookStoreContext _context;
        public IBookRepository BookRepository { get; private set; }
        public UnitOfWork(BookStoreContext context)
        {
            _context = context;
            BookRepository = new BookRepository(_context);
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
