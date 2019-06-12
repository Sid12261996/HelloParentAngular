import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'process';
import { apiUrl } from 'src/environments/environment';
import { BookIssuedView } from '../views/booksissuedview';


@Injectable({
  providedIn: 'root'
})
export class BookReturnService {

  constructor(private http: HttpClient) { }

  issueBook(bookTransaction){
  return this.http.post(`${apiUrl}/bookissue/`,BookIssuedView);
  }
}
