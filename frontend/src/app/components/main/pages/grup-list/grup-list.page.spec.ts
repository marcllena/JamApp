import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupListPage } from './grup-list.page';

describe('GrupListPage', () => {
  let component: GrupListPage;
  let fixture: ComponentFixture<GrupListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
