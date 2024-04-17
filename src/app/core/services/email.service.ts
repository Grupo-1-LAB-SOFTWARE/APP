// userEmail.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/env/env-local';

@Injectable({
  providedIn: 'root'
})
export class userEmailService {
  private userEmail!: string;

  setuserEmail(userEmail: string) {
    this.userEmail = userEmail;
  }
  getuserEmail(): string {
    return this.userEmail;
  }


  
}
