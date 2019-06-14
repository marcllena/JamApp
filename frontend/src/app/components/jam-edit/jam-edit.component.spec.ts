import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamEditComponent } from './jam-edit.component';

describe('JamEditComponent', () => {
  let component: JamEditComponent;
  let fixture: ComponentFixture<JamEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamEditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
