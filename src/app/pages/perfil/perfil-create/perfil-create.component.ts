import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-perfil-create',
  templateUrl: './perfil-create.component.html',
  styleUrls: ['./perfil-create.component.scss']
})
export class PerfilCreateComponent implements OnInit {
  perfilComponent:boolean = true;
  title:string = 'Edite seu Perfil'
  form!: FormGroup <any> | null;
  cadastro!: any;
  constructor(
    private formularioService: FormularioService,
    private crudService: CrudService<Usuario>,
    ) {}


    ngOnInit(): void {
      this.crudService.getAll('usuarios/').subscribe (cadastro => {
          this.cadastro = cadastro;
          console.log(this.cadastro);
          this.carregarForm();
      })
  }
  carregarForm() {
    this.form = this.formularioService.getCadastro();
    this.form?.patchValue({
      username: this.cadastro.username,
      nome_completo: this.cadastro.nome_completo,
      perfil: this.cadastro.perfil,
      email: this.cadastro.email,
      password: this.cadastro.password,
      classe: this.cadastro.classe,
      siape: this.cadastro.siape,
      vinculo: this.cadastro.vinculo,
      regime_de_trabalho: this.cadastro.regime_de_trabalho,
      titulacao: this.cadastro.titulacao,
      instituto: this.cadastro.instituto,
      campus: this.cadastro.campos,
      confirmar_senha: this.cadastro.confirmar_senha,
      confirmar_email: this.cadastro.confirmar_email
    })
  }
  editarPerfil() {
    const formCadastro = this.formularioService.getCadastro()

    if(formCadastro?.valid) {
      console.log(formCadastro.value)
      this.crudService.update('usuarios/', formCadastro.value).subscribe({
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
