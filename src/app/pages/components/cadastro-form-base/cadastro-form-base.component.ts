import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { FormValidations } from 'src/app/shared/form-validations';

@Component({
  selector: 'app-cadastro-form-base',
  templateUrl: './cadastro-form-base.component.html',
  styleUrls: ['./cadastro-form-base.component.scss']
})
export class CadastroFormBaseComponent implements OnInit{
  cadastroForm!: FormGroup;
  estadoControl = new FormControl<any | null>(null, Validators.required);
  @Input() perfilComponent!:boolean;
  @Output() acaoClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormularioService
  ) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      campos: ['', Validators.required],
      siape: ['', Validators.required],
      vinculo: ['', Validators.required],
      regimeTrabalho: ['', Validators.required],
      titulacao_academica: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      confirmarEmail: ['', [Validators.required, Validators.email, FormValidations.equalTo('email')]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(3), FormValidations.equalTo('senha')]],
    });
    this.formularioService.setCadastro(this.cadastroForm)
  }

  executarAcao(){
    this.acaoClick.emit()
  }
}
