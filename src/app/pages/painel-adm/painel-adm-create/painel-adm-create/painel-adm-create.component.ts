import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/core/services/crud.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { SharedDataADMService } from 'src/app/core/services/shared-admin-data.service';

@Component({
  selector: 'app-painel-adm-create',
  templateUrl: './painel-adm-create.component.html',
  styleUrls: ['./painel-adm-create.component.scss']
})
export class PainelAdmCreateComponent  implements OnInit{
  cadastroForm!: FormGroup;
  estadoControl = new FormControl<any | null>(null, Validators.required);
  title:string = 'Editar cadastro';
  nomeRelatorio!: string;
  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormularioService,
    private crudService: CrudService<any>,
    private sharedDataService: SharedDataADMService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.sharedDataService.nomeAdminUser$.subscribe(nome => {
      console.log(nome + "teste nome");
      this.nomeRelatorio = nome;
      console.log(this.nomeRelatorio + "teste nome");
      this.carregarDadosUsuario()
    });
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
      email: ['', [Validators.required, Validators.email]], // Email // Senha
    });
  }

  async executarAcao() {
    if (this.cadastroForm?.valid) {
      console.log(this.cadastroForm.value);
      const idUsuario = this.nomeRelatorio; // Supondo que `nomeRelatorio` seja o ID do usuário

      if (idUsuario) {
        this.crudService.updatePainelADM('usuarios/admin/' + idUsuario, this.cadastroForm.value).subscribe({
          next: (value) => {
            this._snackbar.open('Edição realizada com sucesso', 'OK');
             // Recarregar após a atualização ser concluída
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else {
        console.error('ID do usuário não está definido.');
      }
      this.router.navigateByUrl('/painel/administrador')
      window.location.reload();
    }
  }


  carregarDadosUsuario() {
    if(this.nomeRelatorio){

      this.crudService.getOne('usuarios/admin', this.nomeRelatorio).subscribe({

        next: (userData: any) => {
          // Preenche o formulário com os dados do usuário obtidos
          this.cadastroForm.patchValue(userData);
        },
        error: (err) => {
          console.log(err)
          this.router.navigateByUrl('/painel/administrador/editar')
        }
        // Chama o serviço para obter os dados do usuário pelo nome do relatório
      });
    }else {
      console.error('ID do usuário não está definido.');
      this.router.navigateByUrl('/painel/administrador')
    }
  }

}
