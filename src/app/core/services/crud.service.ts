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
    return this.http.get<T[]>(`${this.baseURL}/${endpoint}/`);
  }
  getAllEnsino(endpoint: string, nome: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseURL}/${endpoint}/${nome}/`);
  }

  getAllPesquisa(endpoint: string, nome: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseURL}/${endpoint}/${nome}/`);
  }

  getOne(endpoint: string, id: number | string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}/${endpoint}/${id}/`);
  }

  create(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.baseURL}/${endpoint}/`, data);
  }
  createEnsino(endpoint: string, data: T, nome: string): Observable<T> {
    return this.http.post<T>(`${this.baseURL}/${endpoint}/${nome}/`, data);
  }

  update(endpoint: string, data: T, nome?: string): Observable<T> {
    return this.http.put<T>(`${this.baseURL}/${endpoint}/${nome}/`, data);
  }

  delete(endpoint: string, nome: string , id?: number): Observable<T> {
    return this.http.delete<T>(`${this.baseURL}/${endpoint}/${nome}/${id}`);
  }
  download(endpoint: string,fileName: string | number) {
    return this.http.get(`${this.baseURL}/${endpoint}/${fileName}/`, { responseType: 'blob' });
  }
}
