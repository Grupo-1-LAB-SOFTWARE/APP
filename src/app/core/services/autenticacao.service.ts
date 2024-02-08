import { UserService } from './user.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL } from 'src/env/env-local';
import { Usuario } from '../interfaces/usuario.interface';


interface AuthResponse {
  access_token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {


  private baseURL = API_URL;

  constructor( private http:HttpClient , private UserService: UserService) { }

  autenticar(email: string, senha: string): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${this.baseURL}/auth/login`,
      { email, senha },
      { observe: 'response'}).pipe(
      tap((response) => {
        const authToken = response.body?.access_token || '';
        this.UserService.salvarToken(authToken);
      })
    );
  }

  buscarCadastro(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/auth/perfil`);
  }

  //Código omitido

  editarCadastro(usuario: Usuario):Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.baseURL}/auth/perfil`,usuario);
  }

}




