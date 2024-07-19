import { ChangeDetectorRef, Component } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss',
})
export class BookModalComponent {
  public bookForm: FormGroup;
  public uploadedFiles:any = [];
  public uploading: boolean = false;
  constructor(
    private bookService: BookService,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.bookForm = this.fb.group({});
    this.buildForm();
    if(this.dialogConfig.data) {
      const bookEdit = this.dialogConfig.data;
      this.bookForm.patchValue(bookEdit);
      console.log("edit", this.bookForm.value);
    }
  }
  
  buildForm() {
    this.bookForm = this.fb.group({
      id: new FormControl(0),
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      author: new FormControl(''),
      price: new FormControl(undefined),
      star: new FormControl(''),
      imageUrl: new FormControl(undefined),
    })
  }

  closeDialog(data?: {data: any, isEdit: any}) {
    this.dialogRef.close(data);
  }

  onSave() {
    const book = this.bookForm.value;
    if(book.id) {
      this.updateBook(book);
    } else {
      this.createBook(book);
    }
  }

  createBook(book: any) {
    this.bookService.createBook(book).subscribe(res => {
      this.closeDialog({
        data: res,
        isEdit: false,
      });
    })
  }

  updateBook(book: any) {
    this.bookService.updateBook(book).subscribe(res => {
      this.closeDialog({
        data: res,
        isEdit: true,
      });
    })
  }

  onUpload(event: any) {
    this.uploadedFiles = event.files;
    console.log("files", this.uploadedFiles);
    
    const fileUrl = this.uploadedFiles[0]?.objectURL.changingThisBreaksApplicationSecurity;
    this.bookForm.get('imageUrl')?.setValue(fileUrl);
    this.uploading = false;
    this.cdr.detectChanges();
  }

  onProgress(event: any) {
    this.uploading = true;
  }
}
