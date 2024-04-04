import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  perfilComponent:boolean = false;
  isLogged: boolean = false;

  constructor(
    private formularioService: FormularioService,
    private crudService: CrudService<Usuario>,
    private router: Router,
    private _snackbar: MatSnackBar
    ) {}
    cadastrar() {
      const formCadastro = this.formularioService.getCadastro()

      if (!formCadastro?.valid) {
        this._snackbar.open('Preencha todos os campos.', 'OK', {
          duration: 5000
        });
        return;
      }
      if (formCadastro?.value){

        console.log(formCadastro?.value)
        formCadastro?.valid ?
        this.crudService.create('usuarios/criar/', formCadastro?.value).subscribe({
          next: () => {
            this._snackbar.open('usuário salvo com sucesso.', 'OK', {
              duration: 5000
            });
            this.router.navigate(['/login']);
          },
          error: () => {
            this.router.navigate(['/login']);
            this._snackbar.open('Erro ao Cadastrar Usuário.', 'OK', {
              duration: 5000
            });

          }
        }) :
        this._snackbar.open('Preencha todos os campos.', 'OK', {
          duration: 5000
        });
      }
    }
}
