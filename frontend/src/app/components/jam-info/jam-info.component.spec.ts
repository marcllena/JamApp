import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamInfoComponent } from './jam-info.component';

describe('JamInfoComponent', () => {
  let component: JamInfoComponent;
  let fixture: ComponentFixture<JamInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamInfoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
