import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
  ],
  providers: [],
})
export class SharedModule { }
