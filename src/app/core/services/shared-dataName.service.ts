import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceName {
  private nomeRelatorioSubject = new BehaviorSubject<number>(0);
  nomeRelatorio$ = this.nomeRelatorioSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.nomeRelatorioSubject.next(id);
  }
}
