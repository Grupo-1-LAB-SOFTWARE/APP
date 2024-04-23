import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetoExtensaoServiceName {
  private ProjetoExtensaoSubject = new BehaviorSubject<number>(0);
  ProjetoExtensao$ = this.ProjetoExtensaoSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.ProjetoExtensaoSubject.next(id);
  }
}
