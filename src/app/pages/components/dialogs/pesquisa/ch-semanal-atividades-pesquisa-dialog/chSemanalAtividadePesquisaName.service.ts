import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class chSemanalAtividadePesquisaName {
  private chSemanalAtividadePesquisaSubject = new BehaviorSubject<number>(0);
  chSemanalAtividadePesquisa$ = this.chSemanalAtividadePesquisaSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.chSemanalAtividadePesquisaSubject.next(id);
  }
}
