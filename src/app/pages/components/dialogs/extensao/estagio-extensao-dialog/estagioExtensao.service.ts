import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstagioExtensaoServiceName {
  private EstagioExtensaoSubject = new BehaviorSubject<number>(0);
  EstagioExtensao$ = this.EstagioExtensaoSubject.asObservable();

  constructor() { }

  atualizaridEdicaoRelatorio(id: number) {
    this.EstagioExtensaoSubject.next(id);
  }
}
