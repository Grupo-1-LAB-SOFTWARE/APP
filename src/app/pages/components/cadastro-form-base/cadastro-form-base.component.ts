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
  @Input() title:string = 'Crie sua Conta'
  @Output() acaoClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormularioService
  ) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      username: ['', Validators.required],
      nome_completo: ['', Validators.required],
      campus: ['', Validators.required], // Campos
      siape: ['', Validators.required], // Siape
      vinculo: ['', Validators.required],
      classe: ['', Validators.required], // Vinculo
      regime_de_trabalho: ['', Validators.required], // Regime de Trabalho
      titulacao: ['', Validators.required],
      instituto: ['', Validators.required], // Titulacao Academica
      email: ['', [Validators.required, Validators.email]], // Email
      password: ['', [Validators.required, Validators.minLength(3)]], // Senha
      confirmar_email: ['', [Validators.required, Validators.email, FormValidations.equalTo('email')]],
      confirmar_senha: ['', [Validators.required, Validators.minLength(3), FormValidations.equalTo('password')]],
    });
    this.formularioService.setCadastro(this.cadastroForm);
  }

  executarAcao(){
    this.acaoClick.emit()
    console.log(this.cadastroForm)
  }
}
