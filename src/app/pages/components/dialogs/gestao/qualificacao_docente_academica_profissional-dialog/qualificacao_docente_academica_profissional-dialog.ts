import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {  MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/core/services/crud.service';
import { SharedDataServiceName } from 'src/app/core/services/shared-dataName.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IqualificacaoDocenteAcademicaProfissional } from 'src/app/core/interfaces/gestao.interface';

@Component({
  selector: 'app-qualificacao_docente_academica_profissional-dialog',
  templateUrl: './qualificacao_docente_academica_profissional-dialog.html',
  styleUrls: ['./qualificacao_docente_academica_profissional-dialog.scss'],

})
export class QualificacaoDocenteAcademicaProfissionalDialogComponent implements OnInit {
  displayedColumns: string[] = ['tagName', 'sector', 'edit', 'delete'];

  atividadeGestao: IqualificacaoDocenteAcademicaProfissional | undefined;
  gestaoForm = false;
  isCreate = false;

  gestaoData!: MatTableDataSource<IqualificacaoDocenteAcademicaProfissional>;
  gestaoSize = 0;
  nome_relatorio!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private readonly router: Router,
    private _snackbar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private crudService: CrudService<IqualificacaoDocenteAcademicaProfissional>,
    private sharedDataService: SharedDataServiceName,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
  }

  async ngOnInit() {
    console.log(this.data.nomeRelatorio)
    try {
      const result = await this.crudService.getAllGestao('qualificacao_docente_academica_profissional',this.data.nomeRelatorio).toPromise();
      console.log(this.data + "teste data");
      console.log(result + "teste resultado");

      if (result) {
        console.log(result)
        this.gestaoSize = result.length;
        this.gestaoData = new MatTableDataSource<IqualificacaoDocenteAcademicaProfissional>(result);
        this.gestaoData.paginator = this.paginator;
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
    this.gestaoForm = false;
    this.isCreate = false;
    location.reload();
  }

  create() {
    this.gestaoForm = true;
    this.isCreate = true;
  }

  edit(gestao: IqualificacaoDocenteAcademicaProfissional) {
    this.gestaoForm = true;
    this.isCreate = false;
    this.atividadeGestao = gestao;
    if (gestao.id) {
      this.sharedDataService.atualizaridEdicaoRelatorio(this.atividadeGestao.id);
    } else {
      console.error("Nome do relatório não está definido.");
    }
  }

  async delete(radoc: IqualificacaoDocenteAcademicaProfissional) {
    this.atividadeGestao = radoc;
    this.sharedDataService.atualizaridEdicaoRelatorio(this.atividadeGestao.id);
    try {
      const result = await firstValueFrom(
        this.dialog
        .open(ConfirmDialogComponent, { data: "Você quer deletar esse item?" })
        .afterClosed()
      );
      if (result && radoc.id !== undefined) {
        await this.crudService.delete('qualificacao_docente_academica_profissional', this.data.nomeRelatorio , this.atividadeGestao.id).toPromise();
        this._snackbar.open("Item deletado com sucesso", "Fechar", {
          duration: 5000
        });
        // Feche o diálogo após a exclusão ser concluída
        this.dialogRef.close();
 
        // Recarregue o diálogo para atualizar os dados

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
    console.error(arg0);
    // Aqui você pode lidar com o erro de uma forma adequada, como exibindo uma mensagem para o usuário.
  }

}
