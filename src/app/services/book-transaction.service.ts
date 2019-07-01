import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'process';
import { apiUrl } from 'src/environments/environment';
import { BookIssuedView } from '../views/booksissuedview';
import {BookTransaction} from '../model/booktransaction';
import { Observable } from 'rxjs';
import { BookIssue } from '../model/bookissue';


@Injectable({
  providedIn: 'root'
})
export class BookTransactionService {
  private url = apiUrl;
  private endpoint = 'booktransaction';

  constructor(private http: HttpClient) { }

  getIssuedBooks(studentId:string):Observable<any>
  {
    var currentUrl = this.url + this.endpoint + '/'+studentId;
    return this.http.get(currentUrl);
  }

  issueBook(books:BookTransaction[]):Observable<any>
  {
   
    const currentUrl = this.url + this.endpoint + '/bookissue';
    return this.http.post(currentUrl,books);
  }

  returnBook(books:BookTransaction[]):Observable<any>
  {
    const currentUrl = this.url + this.endpoint + '/bookreturn';
    return this.http.post(currentUrl,books);
  }


}
