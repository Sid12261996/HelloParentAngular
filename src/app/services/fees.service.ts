import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, apiNames } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FeeFilterView } from '../views/filters/feeFilter';
@Injectable({
  providedIn: 'root'
})
export class FeesService {
    private url = apiUrl;
  constructor(private http: HttpClient) { }

  // Fetch students by schoolid
  getFees(filter:FeeFilterView):Observable<any>
  {
    const currentUrl = this.url + "fees/getfees";
    return this.http.post(currentUrl,filter);
  }
 
}
