﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ASPCoreAPI.Data;
using ASPCoreAPI.Models;
using ASPCoreAPI.Interfaces;

namespace ASPCoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public BooksController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult getPopularBooks([FromQuery] int count)
        {
            var popularBooks = _unitOfWork.BookRepository.GetPopularBook(count);
            return Ok(popularBooks);
        }

        [HttpGet]
        public IActionResult getAll()
        {
            var allBooks = _unitOfWork.BookRepository.GetAll();
            return Ok(allBooks);
        }

        [HttpPost]
        public IActionResult AddBook([FromBody] Book book)
        {
            _unitOfWork.BookRepository.Add(book);
            _unitOfWork.Complete();
            return Ok();
        }

        [HttpPost]
        public IActionResult DeleteBook([FromBody] Book book)
        {
            _unitOfWork.BookRepository.Remove(book);
            _unitOfWork.Complete();
            return Ok();
        }

        [HttpPost]
        public IActionResult UpdateBook([FromBody] Book book)
        {
            _unitOfWork.BookRepository.
        }
    }
}
