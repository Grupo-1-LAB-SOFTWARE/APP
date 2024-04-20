import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreceptoriaServiceName {
  private PreceptoriaSubject = new BehaviorSubject<number>(0);
  preceptoria$ = this.PreceptoriaSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.PreceptoriaSubject.next(id);
  }
}
