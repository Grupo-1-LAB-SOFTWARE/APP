import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private nomeRelatorioSubject = new BehaviorSubject<string>('');
  nomeRelatorio$ = this.nomeRelatorioSubject.asObservable();

  constructor() { }

  atualizarNomeRelatorio(nome: string) {
    this.nomeRelatorioSubject.next(nome);
  }
}
