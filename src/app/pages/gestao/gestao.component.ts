import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { gestao } from 'src/app/core/interfaces/gestao.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { ConfirmDialogComponent } from '../components/dialogs/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from '../components/dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrls: ['./gestao.component.scss']
})
export class GestaoComponent implements OnInit {

  displayedColumns: string[] = ['tagName', 'sector', 'createdAt', 'edit', 'delete', 'download'];

  gestao: gestao | undefined;
  gestaoForm = false;
  isCreate = false;

  gestaoData!: MatTableDataSource<gestao>;
  gestaoSize = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly router: Router,
    private _snackbar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private crudService: CrudService<gestao>
  ) {
  }

  async ngOnInit() {
    try {
      const result = await this.crudService.getAll('gestao').toPromise();
      if (result) {
        this.gestaoSize = result.length;
        this.gestaoData = new MatTableDataSource<gestao>(result);
        this.gestaoData.paginator = this.paginator;
      } else {
        console.error("Erro ao obter dados do Relátorio de gestao: resultado indefinido");
        this.onError("Erro ao obter dados do Relátorio de gestao");
      }
    } catch (error) {
      console.error(error);
      this.onError("Erro ao obter dados do Relátorio de gestao");
    }
  }

  viewList() {
    this.gestaoForm = false;
    this.isCreate = false;
    location.reload();
  }

  create() {
    this.gestaoForm = true;
    this.isCreate = true;
  }

  edit(gestao: gestao) {
    this.gestaoForm = true;
    this.isCreate = false;
    this.gestao = gestao;
  }

  async delete(gestao: gestao) {
    try {
      const result = await firstValueFrom(
        this.dialog
          .open(ConfirmDialogComponent, { data: "Você quer deletar esse item?" })
          .afterClosed()
      );
      if (result) {
        await this.crudService.delete('gestao', gestao.id).toPromise();
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

  download(gestao: gestao) {
    try {
      this.crudService.download('pdf/gestao',gestao.id).subscribe(
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
