import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoCreateComponent } from './gestao-create.component';

describe('GestaoCreateComponent', () => {
  let component: GestaoCreateComponent;
  let fixture: ComponentFixture<GestaoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestaoCreateComponent]
    });
    fixture = TestBed.createComponent(GestaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
