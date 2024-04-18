import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError, window } from 'rxjs';
import { RoleService } from '../services/role.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private roleService: RoleService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.tokenService.possuiToken()) {
      const token = this.tokenService.retornarToken();
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Chama a função de logout do serviço de token
          this.tokenService.excluirToken();
          this.roleService.excluirRole();

          // Você pode redirecionar para a página de login ou mostrar uma mensagem de erro aqui
        }
        return throwError(error);
      })
    );
  }
}
