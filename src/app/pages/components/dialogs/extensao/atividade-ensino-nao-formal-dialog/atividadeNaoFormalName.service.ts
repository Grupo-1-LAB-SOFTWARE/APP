import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtividadeNaoFormalServiceName {
  private AtividadeNaoFormalSubject = new BehaviorSubject<number>(0);
  AtividadeNaoFormal$ = this.AtividadeNaoFormalSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.AtividadeNaoFormalSubject.next(id);
  }
}
