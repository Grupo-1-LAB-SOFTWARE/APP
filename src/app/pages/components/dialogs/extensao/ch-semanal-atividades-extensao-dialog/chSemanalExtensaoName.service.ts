import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CHSemanalExtensaoServiceName {
  private CHSemanalExtensaoSubject = new BehaviorSubject<number>(0);
  CHSemanalExtensao$ = this.CHSemanalExtensaoSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.CHSemanalExtensaoSubject.next(id);
  }
}
