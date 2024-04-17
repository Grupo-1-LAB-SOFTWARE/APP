import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailActivationService {
  private apiUrl = 'http://127.0.0.1:8000/activate';


  constructor(private http: HttpClient) { }

  activateEmail(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${username}`);
  }
}
