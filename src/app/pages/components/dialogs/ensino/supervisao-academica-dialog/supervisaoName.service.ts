import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupervisaoServiceName {
  private SupervisaoSubject = new BehaviorSubject<number>(0);
  Supervisao$ = this.SupervisaoSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.SupervisaoSubject.next(id);
  }
}
