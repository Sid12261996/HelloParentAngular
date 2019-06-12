import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, apiNames } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  // Fetch students by schoolid
  getStudentsBy(schoolId):Observable<student[]> {   
    return this.http.get<student[]>(apiUrl+'student'+"/"+schoolId)
  }
}
