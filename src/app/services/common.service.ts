import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, apiNames } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  // Fetch students by schoolid
  getFeeFrequency():Observable<Map<string, string>[]> {   
    return this.http.get<Map<string, string>[]>(apiUrl+'common/feefrequency')
  }
  getFeeStatus():Observable<Map<string, string>[]> {   
    return this.http.get<Map<string, string>[]>(apiUrl+'common/feestatus')
  }
}
