import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailActivationService } from 'src/app/core/services/ativadorEmail.service';
import { userEmailService } from 'src/app/core/services/email.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tela-confirmar',
  templateUrl: './tela-confirmar.component.html',
  styleUrls: ['./tela-confirmar.component.scss']
})
export class TelaConfirmarComponent implements OnInit {
  confirmationMessage!: string;
  username: string = '';
  emailConfirmado: boolean = false;

  constructor(
    public userEmailService: userEmailService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private emailActivationService: EmailActivationService,
    private router: Router,
    formBuilder: FormBuilder
  ) {}


  ngOnInit(): void {

  }
}
