import { Component } from '@angular/core';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-perfil-create',
  templateUrl: './perfil-create.component.html',
  styleUrls: ['./perfil-create.component.scss']
})
export class PerfilCreateComponent {
  perfilComponent:boolean = true;
  title:string = 'Edite seu Perfil'
  constructor(
    private formularioService: FormularioService,
    private crudService: CrudService<Usuario>
    ) {}
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
