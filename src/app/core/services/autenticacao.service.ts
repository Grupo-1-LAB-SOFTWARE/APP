import { UserService } from './user.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL } from 'src/env/env-local';
import { Usuario } from '../interfaces/usuario.interface';
import { RoleService } from './role.service';


interface AuthResponse {
  token: string;
  perfil: string;
}
@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {


  private baseURL = API_URL;

  constructor( private http:HttpClient , private UserService: UserService, private roleService: RoleService) { }

  autenticar(email: string, senha: string): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${this.baseURL}/login/`,
      { login:email, password:senha },
      { observe: 'response'}).pipe(
      tap((response) => {
        const authToken = response.body?.token || '';
        const authRole = response.body?.perfil || '';
        this.roleService.salvarRole(authRole);
        this.UserService.salvarToken(authToken);
      })
    );
  }

  buscarCadastro(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/usuarios/`);
  }

  //Código omitido

  editarCadastro(usuario: Usuario):Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.baseURL}/usuarios/`,usuario);
  }

}




