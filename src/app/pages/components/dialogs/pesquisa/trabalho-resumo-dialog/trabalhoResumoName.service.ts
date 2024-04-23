import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class trabalhoResumoName {
  private trabalhoResumoSubject = new BehaviorSubject<number>(0);
  trabalhoResumo$ = this.trabalhoResumoSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.trabalhoResumoSubject.next(id);
  }
}
