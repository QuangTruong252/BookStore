import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.constant';
import { catchError, map } from 'rxjs';
import { Book } from '../interfaces/book.interface';

@Injectable({
    providedIn: 'root',
})

export class BookService {

    constructor(
        private http: HttpClient,
    ) { }

    getAllBook() {
        return this.http.get(APP_CONFIG.apiUrl + 'Books/get-books').pipe(
            map((res: any) => {
                console.log(res);
                
                if (res) {
                    return res;
                }
            }),
            catchError(err => {
                throw err;
            })
        )
    }

    createBook(book: Book) {
        return this.http.post(APP_CONFIG.apiUrl + 'Books', book).pipe(
            map((res: any) => {
                return res;
            }),
            catchError(err => err)
        )
    }

    updateBook(book: Book) {
        return this.http.patch(APP_CONFIG.apiUrl + 'Books', book).pipe(
            map((res: any) => {
                return res;
            }),
            catchError(err => err)
        )
    }

    deleteBook(book: Book) {
        return this.http.put(APP_CONFIG.apiUrl + 'Books', book).pipe(
            map((res: any) => {
                return res;
            }),
            catchError(err => err)
        )
    }
}