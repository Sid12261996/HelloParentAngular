import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SchoolClass} from '../model/schoolclass';
import {apiUrl} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {

  private url = apiUrl;

  constructor(private http: HttpClient) {
  }

  getclassesBysession(session:string): Observable<SchoolClass[]> {
    const currentUrl = `${this.url + 'schoolclass/'+session+'/session'}`;
    return this.http.get<SchoolClass[]>(currentUrl);
  }

}
