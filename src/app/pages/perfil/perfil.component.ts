import { Usuario } from './../../core/interfaces/usuario.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PerfilCreateComponent } from './perfil-create/perfil-create.component';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/core/services/crud.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  step = 0;

  saveData:any

  constructor(public router: Router, public crudService: CrudService<Usuario> ){}
  chamarComponentePerfilCreate() {
    this.router.navigateByUrl('/perfil/painel', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/perfil/painel/editar']);
    });
  }
  ngOnInit() {
    this.crudService.getOne('usuarios', 2).subscribe( data => {
      this.saveData = data
      console.log(this.saveData)
    })
  }

}
