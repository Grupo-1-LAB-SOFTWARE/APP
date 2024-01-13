import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/env/env-local';


@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  private baseURL = API_URL;

  constructor(private http: HttpClient) {}

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseURL}/${endpoint}`);
  }

  getOne(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseURL}/${endpoint}/${id}`);
  }

  create(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.baseURL}/${endpoint}`, data);
  }

  update(endpoint: string, id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseURL}/${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.baseURL}/${endpoint}/${id}`);
  }
  download(endpoint: string,fileName: string | number) {
    return this.http.get(`${this.baseURL}/${endpoint}/${fileName}`, { responseType: 'blob' });
  }
}
