import { jwtDecode } from "jwt-decode";
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';
interface Usuario {
  id: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private tokenService: TokenService) {}



  retornarUser() {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string | null) {
    if (token) {
      this.tokenService.salvarToken(token);

    }
  }
  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }
}
