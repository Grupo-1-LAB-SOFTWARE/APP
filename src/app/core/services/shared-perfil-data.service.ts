import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataperfilService {
  private nomeUserSubject = new BehaviorSubject<string>('');
  nomeUser$ = this.nomeUserSubject.asObservable();

  constructor() { }

  atualizarNomeDoUser(nomeAdminUser: string) {
    this.nomeUserSubject.next(nomeAdminUser);
    console.log(this.nomeUserSubject + 'teste123');
  }
}
