using ASPCoreAPI.Data;
using ASPCoreAPI.Interfaces;
using ASPCoreAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPCoreAPI.Repositories
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(BookStoreContext context) : base(context) { }
        public IEnumerable<Book> GetPopularBook(int count)
        {
            return _context.Books.OrderByDescending(d => d.Star).Take(count).ToList();
        }

        public async Task<IEnumerable<Book>> GetBooks(int page, int pageSize, string search)
        {
            var query = _context.Books.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(b => b.Title.Contains(search) || b.Author.Contains(search));
            }

            query = query.Skip((page - 1) * pageSize).Take(pageSize);

            return await query.ToListAsync();
        }
    }
}
