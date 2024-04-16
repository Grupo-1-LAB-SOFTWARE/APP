import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { userEmailService } from 'src/app/core/services/email.service'; // Importe o serviço de email

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  perfilComponent: boolean = false;
  isLogged: boolean = false;

  constructor(
    private formularioService: FormularioService,
    private crudService: CrudService<Usuario>,
    private router: Router,
    private _snackbar: MatSnackBar,
    private EmailService: userEmailService // Injete o serviço de email
  ) {}

  cadastrar() {
    const formCadastro = this.formularioService.getCadastro();

    if (!formCadastro?.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    if (formCadastro?.value) {
      const email = formCadastro.value.email; // Obtenha o valor do email do formulário
      this.EmailService.setuserEmail(email); // Armazene o email no serviço de email

      console.log(formCadastro?.value);
      formCadastro?.valid ?
        this.crudService.create('usuarios/criar/', formCadastro?.value).subscribe({
          next: () => {
            this._snackbar.open('Usuário salvo com sucesso.', 'OK', {
              duration: 5000
            });
            this.router.navigate(['/tela-confirmar']);
          },
          error: () => {
            this.router.navigate(['/login']);
            this._snackbar.open('Erro ao cadastrar usuário.', 'OK', {
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
