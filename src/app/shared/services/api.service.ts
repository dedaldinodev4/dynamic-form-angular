import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormField } from '../model/form-field';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createField(data: FormField<string>): Observable<any> {
    return this.http.post(`${environment.apiURL}/inputs`, data);
  }

  getFields(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/inputs`)
  }

  updateField(data: FormField<string>, id: number): Observable<unknown> {
    return this.http.put(`${environment.apiURL}/inputs/${id}`, data);
  }


}
