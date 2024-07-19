import { Component } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { Book } from '../../../../interfaces/book.interface';

@Component({
  selector: 'app-book-home',
  templateUrl: './book-home.component.html',
  styleUrl: './book-home.component.scss'
})
export class BookHomeComponent {
  public data: Book[] = [];
  constructor(
    private bookService: BookService,
  ) {

  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getAllBook().subscribe(data => {
      this.data = data;
      console.log("data", this.data);
    })
  }
}
