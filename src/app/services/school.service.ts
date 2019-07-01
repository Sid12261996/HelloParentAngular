import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Session,FeeCycle} from '../model/school';
import {apiUrl} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private url = apiUrl;

  constructor(private http: HttpClient) {
  }

  getSessions(): Observable<Session[]> {
    const currentUrl = `${this.url + 'school/activeschool'}`;
    return this.http.get<Session[]>(currentUrl);
  }
  getFeeCyclesBySession(sessionId:string): Observable<FeeCycle[]> {
    const currentUrl = `${this.url + 'school/feecycles/'+sessionId}`;
    console.log(currentUrl);
    return this.http.get<FeeCycle[]>(currentUrl);
  }

}
