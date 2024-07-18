using System;

namespace ASPCoreAPI.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IBookRepository BookRepository { get; }
        int Complete();
    }
}
