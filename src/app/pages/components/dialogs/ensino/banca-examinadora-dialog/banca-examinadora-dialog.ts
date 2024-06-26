import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { SharedDataServiceName} from 'src/app/core/services/shared-dataName.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { IbancaExaminadora } from 'src/app/core/interfaces/ensino.interface';
import { bancaServiceName } from './bancaName.service';
@Component({
  selector: 'app-banca-examinadora-dialog',
  templateUrl: './banca-examinadora-dialog.html',
  styleUrls: ['./banca-examinadora-dialog.scss']
})
export class BancaExaminadoraDialogComponent  implements OnInit {
  displayedColumns: string[] = ['tagName', 'sector', 'edit', 'delete'];

  atividadeLetiva: IbancaExaminadora | undefined;
  ensinoForm = false;
  isCreate = false;

  ensinoData!: MatTableDataSource<IbancaExaminadora>;
  ensinoSize = 0;
  nome_relatorio!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private readonly router: Router,
    private _snackbar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private crudService: CrudService<IbancaExaminadora>,
    private sharedDataService: bancaServiceName,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  async ngOnInit() {
    console.log(this.data.nomeRelatorio)
    try {
      const result = await this.crudService.getAllEnsino('banca_examinadora',this.data.nomeRelatorio).toPromise();
      console.log(this.data + "teste data");
      console.log(result + "teste resultado");

      if (result) {
        console.log(result)
        this.ensinoSize = result.length;
        this.ensinoData = new MatTableDataSource<IbancaExaminadora>(result);
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

  edit(ensino: IbancaExaminadora) {
    this.ensinoForm = true;
    this.isCreate = false;
    this.atividadeLetiva = ensino;
    if (ensino.id) {
      this.sharedDataService.atualizaridEdicaoRelatorio(this.atividadeLetiva.id);
    } else {
      console.error("Nome do relatório não está definido.");
    }
  }

  async delete(radoc: IbancaExaminadora) {
    this.atividadeLetiva = radoc;
    this.sharedDataService.atualizaridEdicaoRelatorio(this.atividadeLetiva.id);
    try {
      const result = await firstValueFrom(
        this.dialog
        .open(ConfirmDialogComponent, { data: "Você quer deletar esse item?" })
        .afterClosed()
      );
      if (result && radoc.id !== undefined) { // Verifique se radoc.id está definido
        await this.crudService.delete('banca_examinadora', this.data.nomeRelatorio , this.atividadeLetiva.id).toPromise();
        this._snackbar.open("Item deletado com sucesso", "Fechar", {
          duration: 5000
        });
        location.reload();
      } else {
        console.error("ID do item não está definido.");
        // Aqui você pode lidar com o cenário em que radoc.id não está definido, por exemplo, exibindo uma mensagem para o usuário.
      }
    } catch (error) {
      console.error(error);
      this.onError("Não foi possível deletar o item");}
  }
  onError(arg0: string) {
    throw new Error('Method not implemented.');
  }

}
