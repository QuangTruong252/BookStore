using ASPCoreAPI.Models;
using System.Linq.Expressions;

namespace ASPCoreAPI.Interfaces
{
    public interface IBookRepository : IGenericRepository<Book>
    {
        IEnumerable<Book> GetPopularBook(int count);
        Task<IEnumerable<Book>> GetBooks(int page, int pageSize, string search);
    }
}