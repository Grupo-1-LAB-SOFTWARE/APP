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

import { TelaConfirmarComponent } from './pages/tela-confirmar/tela-confirmar.component';
import { TokenService } from './core/services/token.service';
import { userEmailService } from '../../src/app/core/services/email.service'
import { EmailActivationService } from './core/services/ativadorEmail.service';
import { PainelAdmComponent } from './pages/painel-adm/painel-adm.component';

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
  bootstrap: [AppComponent,
            TelaConfirmarComponent
  ],
  providers: [
    userEmailService,
    EmailActivationService,
    { provide: HTTP_INTERCEPTORS, useClass: AutenticacaoInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {

  constructor(private tokenService: TokenService) { }
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event) {
    this.tokenService.excluirToken();
  }
}
