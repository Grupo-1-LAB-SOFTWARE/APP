import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ensino } from 'src/app/core/interfaces/ensino.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { ErrorDialogComponent } from '../components/dialogs/error-dialog/error-dialog.component';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from '../components/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-radoc',
  templateUrl: './radoc.component.html',
  styleUrls: ['./radoc.component.scss']
})
export class RadocComponent implements OnInit {

    displayedColumns: string[] = ['tagName', 'sector', 'createdAt', 'edit', 'delete', 'download'];

    ensino: ensino | undefined;
    ensinoForm = false;
    isCreate = false;

    ensinoData!: MatTableDataSource<ensino>;
    ensinoSize = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
      private readonly router: Router,
      private _snackbar: MatSnackBar,
      private _liveAnnouncer: LiveAnnouncer,
      public dialog: MatDialog,
      private crudService: CrudService<ensino>
    ) {
    }

    async ngOnInit() {
      try {
        const result = await this.crudService.getAll('ensino').toPromise();
        if (result) {
          this.ensinoSize = result.length;
          this.ensinoData = new MatTableDataSource<ensino>(result);
          this.ensinoData.paginator = this.paginator;
        } else {
          console.error("Erro ao obter dados do Relátorio de ensino: resultado indefinido");
          this.onError("Erro ao obter dados do Relátorio de ensino");
        }
      } catch (error) {
        console.error(error);
        this.onError("Erro ao obter dados do Relátorio de ensino");
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

    edit(ensino: ensino) {
      this.ensinoForm = true;
      this.isCreate = false;
      this.ensino = ensino;
    }

    async delete(ensino: ensino) {
      try {
        const result = await firstValueFrom(
          this.dialog
            .open(ConfirmDialogComponent, { data: "Você quer deletar esse item?" })
            .afterClosed()
        );
        if (result) {
          await this.crudService.delete('ensino', ensino.id).toPromise();
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

    download(ensino: ensino) {
      try {
        this.crudService.download('pdf/ensino',ensino.id).subscribe(
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
