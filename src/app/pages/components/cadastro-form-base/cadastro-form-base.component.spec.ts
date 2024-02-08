import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFormBaseComponent } from './cadastro-form-base.component';

describe('CadastroFormBaseComponent', () => {
  let component: CadastroFormBaseComponent;
  let fixture: ComponentFixture<CadastroFormBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroFormBaseComponent]
    });
    fixture = TestBed.createComponent(CadastroFormBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
