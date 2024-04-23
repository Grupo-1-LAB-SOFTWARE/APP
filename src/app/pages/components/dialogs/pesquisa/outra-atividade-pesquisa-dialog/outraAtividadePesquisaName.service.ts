import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class outraAtividadePesquisaName {
  private outraAtividadePesquisaSubject = new BehaviorSubject<number>(0);
  outraAtividadePesquisa$ = this.outraAtividadePesquisaSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.outraAtividadePesquisaSubject.next(id);
  }
}
