import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/core/services/crud.service';
import { ConfirmDialogComponent } from '../components/dialogs/confirm-dialog/confirm-dialog.component';
import { firstValueFrom } from 'rxjs';
import { ErrorDialogComponent } from '../components/dialogs/error-dialog/error-dialog.component';
import { pesquisa } from 'src/app/core/interfaces/pesquisa.interface';



@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss']
})
export class PesquisaComponent implements OnInit {

  displayedColumns: string[] = ['tagName', 'sector', 'createdAt', 'edit', 'delete', 'download'];

  pesquisa: pesquisa | undefined;
  pesquisaForm = false;
  isCreate = false;

  pesquisaData!: MatTableDataSource<pesquisa>;
  pesquisaSize = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly router: Router,
    private _snackbar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private crudService: CrudService<pesquisa>
  ) {
  }

  async ngOnInit() {
    try {
      const result = await this.crudService.getAll('pesquisa').toPromise();
      if (result) {
        this.pesquisaSize = result.length;
        this.pesquisaData = new MatTableDataSource<pesquisa>(result);
        this.pesquisaData.paginator = this.paginator;
      } else {
        console.error("Erro ao obter dados do Relátorio de pesquisa: resultado indefinido");
        this.onError("Erro ao obter dados do Relátorio de pesquisa");
      }
    } catch (error) {
      console.error(error);
      this.onError("Erro ao obter dados do Relátorio de pesquisa");
    }
  }

  viewList() {
    this.pesquisaForm = false;
    this.isCreate = false;
    location.reload();
  }

  create() {
    this.pesquisaForm = true;
    this.isCreate = true;
  }

  edit(pesquisa: pesquisa) {
    this.pesquisaForm = true;
    this.isCreate = false;
    this.pesquisa = pesquisa;
  }

  async delete(pesquisa: pesquisa) {
    try {
      const result = await firstValueFrom(
        this.dialog
          .open(ConfirmDialogComponent, { data: "Você quer deletar esse item?" })
          .afterClosed()
      );
      if (result) {
        await this.crudService.delete('pesquisa', pesquisa.id).toPromise();
        this._snackbar.open("Item deletado com sucesso", "Fechar", {
          duration: 5000
        });
        location.reload();
      }
    } catch (error) {
      console.error(error);
      this.onError("Não foi possível deletar o item");
    }
  }


  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }

  download(pesquisa: pesquisa) {
    try {
      this.crudService.download('pdf/pesquisa',pesquisa.id).subscribe(
        (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        }
      );
    } catch (error) {
      console.error(error);
      this.onError("Não foi possível baixar o PDF");
    }
  }

}
