import { TestBed, async, inject } from '@angular/core/testing';

import { MyguardGuard } from './myguard.guard';

describe('MyguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyguardGuard]
    });
  });

  it('should ...', inject([MyguardGuard], (guard: MyguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
