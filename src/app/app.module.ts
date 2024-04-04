import { CUSTOM_ELEMENTS_SCHEMA, HostListener, LOCALE_ID, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './pages/components/components.module';
import { CoreModule } from './core/core.module';

import { MaterialModule } from './shared/material/material.module';


import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AutenticacaoInterceptor } from './core/interceptors/autenticacao.interceptor';
<<<<<<< HEAD
import { TelaConfirmarComponent } from './pages/tela-confirmar/tela-confirmar.component';
=======
import { TokenService } from './core/services/token.service';
>>>>>>> 97cf8c3408b8b106db2991e123e74232ef93cd18

registerLocaleData(localePT);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    TelaConfirmarComponent,

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
  providers: [{
    provide: [HTTP_INTERCEPTORS,LOCALE_ID],
    useClass: AutenticacaoInterceptor,
    multi: true,
    useValue: 'pt-br'
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {

  constructor(private tokenService: TokenService) { }
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event) {
    this.tokenService.excluirToken(); 
  }
}
