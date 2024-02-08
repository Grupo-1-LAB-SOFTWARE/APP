import { Component } from '@angular/core';
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


  constructor(
    private formularioService: FormularioService,
    private crudService: CrudService<Usuario>
    ) {}
  cadastrar() {
    const formCadastro = this.formularioService.getCadastro()

    if(formCadastro?.valid) {
      console.log(formCadastro.value)
      this.crudService.create('cadastro', formCadastro.value).subscribe({
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
