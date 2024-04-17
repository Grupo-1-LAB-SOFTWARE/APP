import { Injectable } from '@angular/core';


const KEY = 'perfil';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  salvarRole(role: string) {
    return localStorage.setItem(KEY, role);
  }

  excluirRole() {
    return localStorage.removeItem(KEY);
  }

  retornarRole(): string | any {
    return localStorage.getItem(KEY) ?? "";
  }

  possuiRole() {
    return !!this.retornarRole();
  }
}
