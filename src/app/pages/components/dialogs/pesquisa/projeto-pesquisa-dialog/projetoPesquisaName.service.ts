import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class projetoPesquisaName {
  private projetoPesquisaSubject = new BehaviorSubject<number>(0);
  projetoPesquisa$ = this.projetoPesquisaSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.projetoPesquisaSubject.next(id);
  }
}
