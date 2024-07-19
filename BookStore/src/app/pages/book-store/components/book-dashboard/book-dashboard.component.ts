import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { Book } from '../../../../interfaces/book.interface';
import { BookService } from '../../../../services/book.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrl: './book-dashboard.component.scss',
  providers: [DialogService, MessageService]
})
export class BookDashboardComponent {
  public dialogRef: DynamicDialogRef | undefined;
  public books: Book[] = [];
  constructor(
    private dialogService: DialogService,
    private bookService: BookService,
    private msgService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.getBooks();
  }

  showSuccessMessage(msg:string) {
    this.msgService.add({
      key: 'success',
      severity: 'success',
      summary: 'Success', 
      detail: msg,
    })
  }

  openBookModal(book?: any) {
    this.dialogRef = this.dialogService.open(BookModalComponent, {
      showHeader: false,
      styleClass: 'book-dialog-container',
      data: book
    });

    this.dialogRef.onClose.subscribe(res => {
      this.getBooks();
      res.isEdit ? this.showSuccessMessage("Add book successfully") : this.showSuccessMessage("Update book successfully");
    })
  }

  getBooks() {
    this.bookService.getAllBook().subscribe(data => {
      this.books = data;
      console.log("data", this.books);
    })
  }

  deleteBook(book: any) {
    this.bookService.deleteBook(book).subscribe(res => {
      this.getBooks();
      this.showSuccessMessage("Delete book successfully")
    })
  }
}
