import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class descricaoServiceName {
  private descricaoSubject = new BehaviorSubject<number>(0);
  descricao$ = this.descricaoSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.descricaoSubject.next(id);
  }
}
