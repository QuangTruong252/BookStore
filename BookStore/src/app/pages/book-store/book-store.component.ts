import { Component } from '@angular/core';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrl: './book-store.component.scss',
})
export class BookStoreComponent {
  activeIndex: number = 1;
  constructor() {

  }
  
  navigate(index: number) {
    this.activeIndex = index;
  }
}
