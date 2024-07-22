using ASPCoreAPI.Interfaces;
using ASPCoreAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASPCoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileService _fileService;
        public BooksController(
            IUnitOfWork unitOfWork,
            IFileService fs
            )
        {
            _unitOfWork = unitOfWork;
            _fileService = fs;
        }

        [HttpGet("get-popular-books")]
        public IActionResult GetPopularBooks([FromQuery] int count)
        {
            var popularBooks = _unitOfWork.BookRepository.GetPopularBook(count);
            return Ok(popularBooks);
        }

        [HttpGet("get-books")]
        public async Task<IActionResult> GetBooks([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string search = "")
        {
            var books = await _unitOfWork.BookRepository.GetBooks(page, pageSize, search);
            return Ok(books);
        }

        [HttpPost]
        public IActionResult AddBook([FromBody] Book book)
        {
            if (book.ImageFile != null && book.Image != null)
            {
                IFormFile file = _fileService.Base64ToImage(book.ImageFile, book.Image);
                var fileResult = _fileService.SaveImage(file);
                if (fileResult.Item1 == 1)
                {
                    book.Image = fileResult.Item2;
                }
            }
            _unitOfWork.BookRepository.Add(book);
            _unitOfWork.Complete();
            return Ok(book);
        }

        [HttpPut]
        public IActionResult DeleteBook([FromBody] Book book)
        {
            _unitOfWork.BookRepository.Remove(book);
            _unitOfWork.Complete();
            return Ok(book);
        }

        [HttpPatch]
        public IActionResult UpdateBook([FromBody] Book book)
        {
            _unitOfWork.BookRepository.Update(book);
            _unitOfWork.Complete();
            return Ok(book);
        }
    }
}
