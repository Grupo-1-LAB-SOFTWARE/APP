import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelAdmComponent } from './painel-adm.component';

describe('PainelAdmComponent', () => {
  let component: PainelAdmComponent;
  let fixture: ComponentFixture<PainelAdmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PainelAdmComponent]
    });
    fixture = TestBed.createComponent(PainelAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
