import { jwtDecode } from "jwt-decode";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoleService } from "./role.service";
interface Usuario {
  perfil: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  private profileSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private roleService: RoleService) {}



  retornarUser() {
    return this.profileSubject.asObservable();
  }

  salvarToken(token: string | null) {
    if (token) {
      this.roleService.salvarRole(token);

    }
  }
  logout() {
    this.roleService.excluirRole();
    this.profileSubject.next(null);
  }

  estaLogado() {
    return this.roleService.possuiRole();
  }
}
