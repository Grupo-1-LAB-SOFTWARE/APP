import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadocComponent } from './radoc.component';

describe('RadocComponent', () => {
  let component: RadocComponent;
  let fixture: ComponentFixture<RadocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadocComponent]
    });
    fixture = TestBed.createComponent(RadocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
