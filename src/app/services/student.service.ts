import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, apiNames } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  // Fetch students by schoolid
  getStudentsBySchool(schoolId):Observable<Student[]> {   
    return this.http.get<Student[]>(apiUrl+'student'+"/"+schoolId)
  }
  getStudentsByClass(classId):Observable<Student[]> {   
    return this.http.get<Student[]>(apiUrl+'student'+"/"+classId+"/class")
  }
}
