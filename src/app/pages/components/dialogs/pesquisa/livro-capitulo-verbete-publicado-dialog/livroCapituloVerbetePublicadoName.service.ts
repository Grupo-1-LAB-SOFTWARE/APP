import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class livroCapituloVerbetePublicadoName {
  private livroCapituloVerbetePublicadoSubject = new BehaviorSubject<number>(0);
  livroCapituloVerbetePublicado$ = this.livroCapituloVerbetePublicadoSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.livroCapituloVerbetePublicadoSubject.next(id);
  }
}
