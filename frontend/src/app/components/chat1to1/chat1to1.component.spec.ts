import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chat1to1Component } from './chat1to1.component';

describe('Chat1to1Component', () => {
  let component: Chat1to1Component;
  let fixture: ComponentFixture<Chat1to1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chat1to1Component ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chat1to1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
