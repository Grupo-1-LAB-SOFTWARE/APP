import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class avPedagogicaServiceName {
  private avPedagogicaSubject = new BehaviorSubject<number>(0);
  avPedagogica$ = this.avPedagogicaSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.avPedagogicaSubject.next(id);
  }
}
