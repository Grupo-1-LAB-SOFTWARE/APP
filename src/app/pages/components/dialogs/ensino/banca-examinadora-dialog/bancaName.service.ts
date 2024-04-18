import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class bancaServiceName {
  private  bancaSubject = new BehaviorSubject<number>(0);
   banca$ = this. bancaSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this. bancaSubject.next(id);
  }
}
