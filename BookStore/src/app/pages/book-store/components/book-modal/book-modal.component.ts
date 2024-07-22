import { ChangeDetectorRef, Component } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss',
})
export class BookModalComponent {
  public bookForm: FormGroup;
  public uploadedFile:any = undefined;
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
      if(bookEdit.image) {
        this.uploadedFile = {
          image: bookEdit.image,
        }
      }
      console.log("book edit", bookEdit);
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
      image: new FormControl(undefined),
      imageFile: new FormControl(undefined)
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

  async onUpload(event: any) {
    this.uploadedFile = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(this.uploadedFile.objectURL).then(r => r.blob());
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      this.bookForm.get('image')?.setValue(this.uploadedFile?.name);
      this.bookForm.get('imageFile')?.setValue(base64data);
      console.log("base 64", base64data);
      
      this.uploading = false;
      this.cdr.detectChanges();
    }
  }

  onProgress(event: any) {
    this.uploading = true;
  }
}
