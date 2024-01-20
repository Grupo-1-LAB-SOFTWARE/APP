import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './pages/components/components.module';
import { CoreModule } from './core/core.module';
import { LayoutComponent } from './pages/components/layout/layout.component';
import { MaterialModule } from './shared/material/material.module';


import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

registerLocaleData(localePT);
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ComponentsModule,
    CoreModule,
    MaterialModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
