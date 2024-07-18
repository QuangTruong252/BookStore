using ASPCoreAPI.Data;
using ASPCoreAPI.Interfaces;
using ASPCoreAPI.Models;

namespace ASPCoreAPI.Repositories
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(BookStoreContext context) : base(context) { }
        public IEnumerable<Book> GetPopularBook(int count)
        {
            return _context.Books.OrderByDescending(d => d.Star).Take(count).ToList();
        }
    }
}
