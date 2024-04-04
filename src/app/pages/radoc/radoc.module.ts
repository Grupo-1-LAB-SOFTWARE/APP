import { CommonModule } from "@angular/common";
import { RadocComponent } from "./radoc.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreModule } from "src/app/core/core.module";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ComponentsModule } from "../components/components.module";
import { FormsModule } from "@angular/forms";
import { RadocRoutingModule } from "./radoc-routing.module";
import { NgModule } from "@angular/core";
import { RadocCreateComponent } from './radoc-create/radoc-create.component';
import { EnsinoCreateComponent } from "../ensino/ensino-create/ensino-create.component";
import { GestaoCreateComponent } from "../gestao/gestao-create/gestao-create.component";
import { PesquisaCreateComponent } from "../pesquisa/pesquisa-create/pesquisa-create.component";
import { ExtensaoCreateComponent } from "../extensao/extensao-create/extensao-create.component";

@NgModule({
  declarations: [
    RadocComponent,
    RadocCreateComponent,
    EnsinoCreateComponent,
    GestaoCreateComponent,
    PesquisaCreateComponent,
    ExtensaoCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    ComponentsModule,
    FormsModule,
    RadocRoutingModule,

  ]
})

export class RadocModule { }
