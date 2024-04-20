import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class avOrientacaoServiceName {
  private  avOrientacaoSubject = new BehaviorSubject<number>(0);
   avOrientacao$ = this. avOrientacaoSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this. avOrientacaoSubject.next(id);
  }
}
