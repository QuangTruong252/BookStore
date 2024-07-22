import { NgModule } from '@angular/core';
import { BookStoreComponent } from './book-store.component';
import { BookStoreRoutingModule } from './book-store-routing.module';
import { BookModalComponent } from './components/book-modal/book-modal.component';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RatingModule } from 'primeng/rating';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BookHomeComponent } from './components/book-home/book-home.component';
import { BookDashboardComponent } from './components/book-dashboard/book-dashboard.component';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../shared/shared.module';
const MODULES = [
  BookStoreRoutingModule,
  ButtonModule,
  DynamicDialogModule,
  InputTextModule,
  FormsModule,
  ReactiveFormsModule,
  KeyFilterModule,
  RatingModule,
  FileUploadModule,
  ImageModule,
  CommonModule,
  ProgressSpinnerModule,
  ToastModule,
  TableModule,
  OverlayPanelModule,
  SharedModule,
  DropdownModule
]

@NgModule({
  declarations: [
    BookStoreComponent,
    BookModalComponent,
    BookHomeComponent,
    BookDashboardComponent,
  ],
  imports: [
    ...MODULES
  ],
  exports: [BookStoreComponent]
})
export class BookStoreModule { }
