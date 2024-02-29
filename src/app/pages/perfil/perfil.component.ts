import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PerfilCreateComponent } from './perfil-create/perfil-create.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  step = 0;
  constructor(public router: Router ){}

}
