import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelAdmCreateComponent } from './painel-adm-create.component';

describe('PainelAdmCreateComponent', () => {
  let component: PainelAdmCreateComponent;
  let fixture: ComponentFixture<PainelAdmCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PainelAdmCreateComponent]
    });
    fixture = TestBed.createComponent(PainelAdmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
