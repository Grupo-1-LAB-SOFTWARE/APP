import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/core/services/crud.service';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-painel-adm-create',
  templateUrl: './painel-adm-create.component.html',
  styleUrls: ['./painel-adm-create.component.scss']
})
export class PainelAdmCreateComponent  implements OnInit{
  cadastroForm!: FormGroup;
  estadoControl = new FormControl<any | null>(null, Validators.required);
  @Input() perfilComponent!:boolean;
  @Input() title:string = 'Editar cadastro';
  @Output() acaoClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormularioService,
    private crudService: CrudService<any>
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
    });
    this.formularioService.setCadastro(this.cadastroForm);
  }

  executarAcao(){

      const formCadastro = this.formularioService.getCadastro()

      if(formCadastro?.valid) {
        console.log(formCadastro.value)
        this.crudService.update('usuarios/admin/', formCadastro.value).subscribe({
          next: (value) => {
            console.log('Cadastro realizado com sucesso', value);
          },
          error: (err) => {
            console.log('Erro ao realizar cadastro', err)
          }
        })
      }

  }
}
