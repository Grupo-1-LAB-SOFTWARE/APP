import { CrudService } from './../../core/services/crud.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ensino } from 'src/app/core/interfaces/ensino.interface';
import { ErrorDialogComponent } from '../components/dialogs/error-dialog/error-dialog.component';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from '../components/dialogs/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from 'src/app/core/services/shared-data.service';


export interface DialogData {
  id?: number;
  nome: string;
  ano_relatorio: string;
}

@Component({
  selector: 'app-radoc',
  templateUrl: './radoc.component.html',
  styleUrls: ['./radoc.component.scss']
})
export class RadocComponent implements OnInit {

    mostrandoSpinner: boolean = false;
    displayedColumns: string[] = ['tagName', 'sector', 'createdAt', 'edit', 'delete', 'download','upload'];

    ensino: ensino | undefined;
    ensinoForm = false;
    isCreate = false;

    ensinoData!: MatTableDataSource<ensino>;
    ensinoSize = 0;

    nome_relatorio!: string;
    data_relatorio!: string;
    data_do_relatorio!: DialogData | undefined;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
      private readonly router: Router,
      private _snackbar: MatSnackBar,
      private _liveAnnouncer: LiveAnnouncer,
      public dialog: MatDialog,
      private crudService: CrudService<ensino>,
      private sharedDataService: SharedDataService
    ) {
    }

    async ngOnInit() {
      try {
        const result = await this.crudService.getAll('relatorio_docente').toPromise();
        if (result) {
          console.log(result)
          this.ensinoSize = result.length;
          this.ensinoData = new MatTableDataSource<ensino>(result);
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
      this.openDialog();
    }

    edit(ensino: ensino) {
      this.mostrandoSpinner = true;
      this.ensinoForm = true;
      this.isCreate = false;
      this.ensino = ensino;
      if (ensino.nome) {
        this.sharedDataService.atualizarNomeRelatorio(ensino.nome);
      } else {
        console.error("Nome do relatório não está definido.");
      }
      this.mostrandoSpinner = false;
    }

    async delete(radoc: DialogData) {
      this.mostrandoSpinner = true;
      try {
        const result = await firstValueFrom(
          this.dialog
          .open(ConfirmDialogComponent, { data: "Você quer deletar esse item?" })
          .afterClosed()
        );
        if (result && radoc.nome !== undefined) { // Verifique se radoc.id está definido
          await this.crudService.deleteradoc('relatorio_docente', radoc.nome).toPromise();
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
        this.onError("Não foi possível deletar o item");
      }
      this.mostrandoSpinner = false;
    }


    onError(errorMessage: string) {
      this.dialog.open(ErrorDialogComponent, {
        data: errorMessage
      });
    }

    download(radoc: DialogData) {
      try {
        if (radoc.id !== undefined) {
          this.crudService.download('download_relatorio_docente', radoc.nome).subscribe(
            (response: Blob) => {
              const blob = new Blob([response], { type: 'application/pdf' });
              const url = window.URL.createObjectURL(blob);
              window.open(url);
            },
            error => {
              console.error(error);
              this.onError("Não foi possível baixar o PDF");
            }
          );
        }
      } catch (error) {
        console.error(error);
        this.onError("Não foi possível baixar o PDF");
      }
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        data: { nome: this.nome_relatorio, ano_relatorio: this.data_relatorio },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.sharedDataService.atualizarNomeRelatorio(result.nome);
        this.data_do_relatorio = result;
      });
    }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./dialog-overview-example-dialog.scss'],
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
  ],
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private crudService: CrudService<DialogData>,
  ) {}

  ensinoForm = false;
  isCreate = false;
  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/radoc'])
    window.location.reload();
  }

  createRelatorio_Docente(){

    const relatorioData: DialogData = {
      nome: this.data.nome,
      ano_relatorio: this.data.ano_relatorio,

    };
    console.log(this.data + "teste data")
    this.crudService.create('relatorio_docente', relatorioData).subscribe(
      (response) => {
        // Aqui você pode tratar a resposta se necessário
        console.log('Novo registro criado com sucesso:', response);
        // Feche o dialog após adicionar com sucesso
        this.dialogRef.close();
        // Adicione aqui um código para atualizar a lista de registros no componente pai, se necessário
      },
      (error) => {
        console.error('Erro ao criar novo registro:', error);
        // Adicione aqui uma lógica para lidar com erros, como exibir uma mensagem de erro ao usuário
      }
    );
    this.router.navigate(['/radoc'])
    window.location.reload();
  }

}
