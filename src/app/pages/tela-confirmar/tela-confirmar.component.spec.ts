import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaConfirmarComponent } from './tela-confirmar.component';

describe('TelaConfirmarComponent', () => {
  let component: TelaConfirmarComponent;
  let fixture: ComponentFixture<TelaConfirmarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaConfirmarComponent]
    });
    fixture = TestBed.createComponent(TelaConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
