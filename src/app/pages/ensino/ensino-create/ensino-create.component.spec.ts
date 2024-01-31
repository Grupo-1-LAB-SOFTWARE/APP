import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsinoCreateComponent } from './ensino-create.component';

describe('EnsinoCreateComponent', () => {
  let component: EnsinoCreateComponent;
  let fixture: ComponentFixture<EnsinoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnsinoCreateComponent]
    });
    fixture = TestBed.createComponent(EnsinoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
