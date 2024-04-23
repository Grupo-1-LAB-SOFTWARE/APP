import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class trabalhoPublicadoName {
  private trabalhoPublicadoSubject = new BehaviorSubject<number>(0);
  trabalhoPublicado$ = this.trabalhoPublicadoSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.trabalhoPublicadoSubject.next(id);
  }
}
