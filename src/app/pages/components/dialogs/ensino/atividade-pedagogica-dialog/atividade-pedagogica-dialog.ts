import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { SharedDataServiceName } from 'src/app/core/services/shared-dataName.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { IatividadePedagogica } from 'src/app/core/interfaces/ensino.interface';
import { avDiscenteServiceName } from '../avaliacao-discente-dialog/avDiscenteName.service';
import { avPedagogicaServiceName } from './avPedagogicaName.service';
@Component({
  selector: 'app-atividade-pedagogica-dialog',
  templateUrl: './atividade-pedagogica-dialog.html',
  styleUrls: ['./atividade-pedagogica-dialog.scss']
})
export class AtividadePedagogicaDialogComponent  implements OnInit {
  displayedColumns: string[] = ['tagName', 'sector', 'edit', 'delete'];

  atividadeLetiva: IatividadePedagogica | undefined;
  ensinoForm = false;
  isCreate = false;

  ensinoData!: MatTableDataSource<IatividadePedagogica>;
  ensinoSize = 0;
  nome_relatorio!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private readonly router: Router,
    private _snackbar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private crudService: CrudService<IatividadePedagogica>,
    private sharedDataService: avPedagogicaServiceName,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  async ngOnInit() {
    console.log(this.data.nomeRelatorio)
    try {
      const result = await this.crudService.getAllEnsino('atividade_pedagogica_complementar',this.data.nomeRelatorio).toPromise();
      console.log(this.data + "teste data");
      console.log(result + "teste resultado");

      if (result) {
        console.log(result)
        this.ensinoSize = result.length;
        this.ensinoData = new MatTableDataSource<IatividadePedagogica>(result);
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

  edit(ensino: IatividadePedagogica) {
    this.ensinoForm = true;
    this.isCreate = false;
    this.atividadeLetiva = ensino;
    if (ensino.id) {
      this.sharedDataService.atualizaridEdicaoRelatorio(this.atividadeLetiva.id);
      console.log('/ensino/atividade-pedagogica/' + this.atividadeLetiva.id)
    } else {
      console.error("Nome do relatório não está definido.");
    }
  }

  async delete(radoc: IatividadePedagogica) {
    this.atividadeLetiva = radoc;
    this.sharedDataService.atualizaridEdicaoRelatorio(this.atividadeLetiva.id);
    try {
      const result = await firstValueFrom(
        this.dialog
        .open(ConfirmDialogComponent, { data: "Você quer deletar esse item?" })
        .afterClosed()
      );
      if (result && radoc.id !== undefined) { // Verifique se radoc.id está definido
        await this.crudService.delete('atividade_pedagogica_complementar', this.data.nomeRelatorio , this.atividadeLetiva.id).toPromise();
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
