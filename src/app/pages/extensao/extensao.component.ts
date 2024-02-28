import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { extensao } from 'src/app/core/interfaces/extensao.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { ErrorDialogComponent } from '../components/dialogs/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../components/dialogs/confirm-dialog/confirm-dialog.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-extensao',
  templateUrl: './extensao.component.html',
  styleUrls: ['./extensao.component.scss']
})
export class ExtensaoComponent implements OnInit {

  displayedColumns: string[] = ['tagName', 'sector', 'createdAt', 'edit', 'delete', 'download'];

  extensao: extensao | undefined;
  extensaoForm = false;
  isCreate = false;

  extensaoData!: MatTableDataSource<extensao>;
  extensaoSize = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly router: Router,
    private _snackbar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private crudService: CrudService<extensao>
  ) {
  }

  async ngOnInit() {
    try {
      const result = await this.crudService.getAll('extensao').toPromise();
      if (result) {
        this.extensaoSize = result.length;
        this.extensaoData = new MatTableDataSource<extensao>(result);
        this.extensaoData.paginator = this.paginator;
      } else {
        console.error("Erro ao obter dados do Relátorio de extensao: resultado indefinido");
        this.onError("Erro ao obter dados do Relátorio de extensao");
      }
    } catch (error) {
      console.error(error);
      this.onError("Erro ao obter dados do Relátorio de extensao");
    }
  }

  viewList() {
    this.extensaoForm = false;
    this.isCreate = false;
    location.reload();
  }

  create() {
    this.extensaoForm = true;
    this.isCreate = true;
  }

  edit(extensao: extensao) {
    this.extensaoForm = true;
    this.isCreate = false;
    this.extensao = extensao;
  }

  async delete(extensao: extensao) {
    try {
      const result = await firstValueFrom(
        this.dialog
          .open(ConfirmDialogComponent, { data: "Você quer deletar esse item?" })
          .afterClosed()
      );
      if (result) {
        await this.crudService.delete('extensao', extensao.id).toPromise();
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

  download(extensao: extensao) {
    try {
      this.crudService.download('pdf/extensao',extensao.id).subscribe(
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
