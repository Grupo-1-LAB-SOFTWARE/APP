import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataADMService {
  private nomeAdminUserSubject = new BehaviorSubject<string>('');
  nomeAdminUser$ = this.nomeAdminUserSubject.asObservable();

  constructor() { }

  atualizarNomeDoADM(nomeAdminUser: string) {
    this.nomeAdminUserSubject.next(nomeAdminUser);
    console.log(this.nomeAdminUserSubject + 'teste123');
  }
}
