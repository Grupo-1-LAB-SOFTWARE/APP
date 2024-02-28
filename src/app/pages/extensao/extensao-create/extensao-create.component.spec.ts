import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensaoCreateComponent } from './extensao-create.component';

describe('ExtensaoCreateComponent', () => {
  let component: ExtensaoCreateComponent;
  let fixture: ComponentFixture<ExtensaoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtensaoCreateComponent]
    });
    fixture = TestBed.createComponent(ExtensaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
