import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ADMDataServiceID {
  private nomeRelatorioSubject = new BehaviorSubject<string>('');
  nomeRelatorio$ = this.nomeRelatorioSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: string) {
    this.nomeRelatorioSubject.next(id);
  }
}
