import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLogged: boolean = false;
  floatLabelControl = 'always' as FloatLabelType;
  initialForm = {
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(3)]],
  }

  constructor(
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private router: Router,
    private authService: AutenticacaoService
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group(this.initialForm);
  }

  fillForm(usuario: Usuario ) {
    this.form.patchValue({
      username: usuario.email,
      password: usuario.senha
    });
  }

  login(){
    if(this.form.valid) {
      const email = this.form.value.username;
      const senha = this.form.value.password;
      this.authService.autenticar(email, senha).subscribe({
        next: (value) => {
          this._snackbar.open('Login efetuado com sucesso', 'OK', {
            duration: 5000
          })
          this.router.navigateByUrl('/')
          this.form.reset();
        },
        error: (err) => {
          this._snackbar.open('Erro ao efetuar login', 'OK', {
            duration: 5000
          })
        },
      })
    }
  }
}
