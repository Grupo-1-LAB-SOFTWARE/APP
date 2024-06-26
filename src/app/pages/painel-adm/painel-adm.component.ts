import { ADMDataServiceID } from './../../core/services/shared-dataName.service copy';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ensino } from 'src/app/core/interfaces/ensino.interface';
import { ConfirmDialogComponent } from '../components/dialogs/confirm-dialog/confirm-dialog.component';
import { firstValueFrom, window } from 'rxjs';
import { DialogData } from '../radoc/radoc.component';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/core/services/crud.service';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';
import { SharedDataADMService } from 'src/app/core/services/shared-admin-data.service';

@Component({
  selector: 'app-painel-adm',
  templateUrl: './painel-adm.component.html',
  styleUrls: ['./painel-adm.component.scss']
})
export class PainelAdmComponent {
    mostrandoSpinner: boolean = false;
    displayedColumns: string[] = ['tagName', 'sector', 'createdAt', 'edit', 'delete'];
    ensino: Usuario | undefined;
    ensinoForm = false;
    isCreate = false;

    ensinoData!: MatTableDataSource<ensino>;
    ensinoSize = 0;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    idUser!:any;
    constructor(
        public router: Router,
        private _snackbar: MatSnackBar,
        private sharedDataService: SharedDataADMService,
        public dialog: MatDialog,
        private crudService: CrudService<Usuario>,
        private ADMDataServiceID: ADMDataServiceID
    ){}

    async ngOnInit() {
      try {
        const result = await this.crudService.getAll('usuarios/admin').toPromise();
        if (result) {
          console.log(result)
          this.ensinoSize = result.length;
          this.ensinoData = new MatTableDataSource<any>(result);
          this.ensinoData.paginator = this.paginator;
        } else {
          console.error("Erro ao obter dados do Relátorio: resultado indefinido");
          this.onError("Erro ao obter dados do Relátorio");
        }
      } catch (error) {
        console.error(error);
        this.onError("Erro ao obter dados do Relátorio");
      }
    }


    viewList() {
      this.ensinoForm = false;
      this.isCreate = false;
      location.reload();
    }

    create() {
      this.ensinoForm = true;
      this.isCreate = true;
    }

    edit(ensino: Usuario) {
      this.mostrandoSpinner = true;
      this.ensinoForm = true;
      this.isCreate = false;
      this.ensino = ensino;
      if (ensino.username) {
        this.sharedDataService.atualizarNomeDoADM(ensino.username);
        console.log('ensino name'+ensino.username)
        this.router.navigateByUrl('/painel/administrador/editar')
      }
      else {
        console.error("Nome do relatório não está definido.");
      }
      this.mostrandoSpinner = false;
    }

    async delete(radoc: Usuario) {
      this.mostrandoSpinner = true;
      this.ADMDataServiceID.atualizaridEdicaoRelatorio(radoc.username);
      this.ADMDataServiceID.nomeRelatorio$.subscribe(data => {
        this.idUser = data
      })

      try {
        const result = await firstValueFrom(
          this.dialog
          .open(ConfirmDialogComponent, { data: "Você quer deletar esse item?" })
          .afterClosed()
        );
        if (result && radoc.username !== undefined) { // Verifique se radoc.id está definido
          await this.crudService.deleteADM('usuarios/admin', this.idUser).toPromise();
          this._snackbar.open("Item deletado com sucesso", "Fechar", {
            duration: 5000
          });
          location.reload();
          this.mostrandoSpinner = false;
        } else {
          console.error("ID do item não está definido.");
          // Aqui você pode lidar com o cenário em que radoc.id não está definido, por exemplo, exibindo uma mensagem para o usuário.
        }
      } catch (error) {
        console.error(error);
        this.onError("Não foi possível deletar o item");
      }
    }
  onError(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
