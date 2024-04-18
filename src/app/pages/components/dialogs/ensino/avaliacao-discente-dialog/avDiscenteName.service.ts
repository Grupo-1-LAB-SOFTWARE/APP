import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class avDiscenteServiceName {
  private avDiscenteSubject = new BehaviorSubject<number>(0);
  avDiscente$ = this.avDiscenteSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.avDiscenteSubject.next(id);
  }
}
