import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamListPage } from './jam-list.page';

describe('JamListPage', () => {
  let component: JamListPage;
  let fixture: ComponentFixture<JamListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
