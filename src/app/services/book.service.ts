import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookViews} from '../views/bookViews';
import {Book} from '../model/book';
import {apiUrl} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = apiUrl;
  private endpoint = 'books';

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    const currentUrl = `${this.url + this.endpoint}`;
    return this.http.get<Book[]>(currentUrl);
  }

  getBookwithCategory(category: number): Observable<Book[]> {
    const currentUrl = `${this.url + this.endpoint}/GetBookswithcategory/${category}`;
    return this.http.get<Book[]>(currentUrl);
  }

  addBook(books: Book, quantity): Observable<any> {
    const currentUrl = `${this.url + this.endpoint}/${quantity}`;
    return this.http.post(currentUrl, books);
  }

  getIssuedBookStudent(bookId:string):Observable<any>
  {
    const currentUrl = this.url + 'bookTransaction/GetStudent/' + bookId;
    return this.http.get(currentUrl);
  }

}
