import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutraAtividadeExtensaoServiceName {
  private OutraAtividadeExtensaoSubject = new BehaviorSubject<number>(0);
  OutraAtividadeExtensao$ = this.OutraAtividadeExtensaoSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.OutraAtividadeExtensaoSubject.next(id);
  }
}
