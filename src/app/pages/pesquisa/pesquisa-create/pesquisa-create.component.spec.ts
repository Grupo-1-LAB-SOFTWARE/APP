import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaCreateComponent } from './pesquisa-create.component';

describe('PesquisaCreateComponent', () => {
  let component: PesquisaCreateComponent;
  let fixture: ComponentFixture<PesquisaCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PesquisaCreateComponent]
    });
    fixture = TestBed.createComponent(PesquisaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
