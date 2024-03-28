import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-tela-confirmar',
  templateUrl: './tela-confirmar.component.html',
  styleUrls: ['./tela-confirmar.component.scss']
})
export class TelaConfirmarComponent {
  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.emailForm.valid) {
      console.log('Email enviado para confirmação:', this.emailForm.value.email);
    }
  }
}
