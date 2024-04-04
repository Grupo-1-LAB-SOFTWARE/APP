import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { TokenService } from 'src/app/core/services/token.service';

export interface Login {
  email: string;
  password: string;
}
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
    private authService: AutenticacaoService,
    private tokenService: TokenService,
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group(this.initialForm);
  }

  fillForm(usuario: Login ) {
    this.form.patchValue({
      username: usuario.email,
      password: usuario.password
    });
  }

  login(){
    if(this.form.valid) {
      const email = this.form.value.username || this.form.value.email;
      const senha = this.form.value.password;
      console.log(this.form.value);

      this.authService.autenticar(email, senha).subscribe({
        next: (value) => {
          this._snackbar.open('Login efetuado com sucesso', 'OK', {
            duration: 5000
          })

          this.router.navigate(['/perfil/painel']);
          this.form.reset();
        },
        error: (err) => {
          this._snackbar.open('Seu e-mail/username ou senha inválidos', 'OK', {
            duration: 5000
          })
          console.log('error:' + err)
        },
      })
    }
  }
}
