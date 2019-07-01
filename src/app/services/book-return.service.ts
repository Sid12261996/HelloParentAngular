import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'process';
import { apiUrl } from 'src/environments/environment';
import { BookIssuedView } from '../views/booksissuedview';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookReturnService {

  private url = apiUrl;
  private endpoint = 'booktransactions';

  constructor(private http: HttpClient) { }

  issueBook(bookTransaction){
  return this.http.post(`${apiUrl}/bookissue/`,BookIssuedView);
  }

  getIssuedBooks(studentId:string):Observable<any>
  {
    const currentUrl = `${this.url + this.endpoint}/${studentId}`;
    return this.http.get(currentUrl);
  }
}
