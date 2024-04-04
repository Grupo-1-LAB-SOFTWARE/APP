import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadocCreateComponent } from './radoc-create.component';

describe('RadocCreateComponent', () => {
  let component: RadocCreateComponent;
  let fixture: ComponentFixture<RadocCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadocCreateComponent]
    });
    fixture = TestBed.createComponent(RadocCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
