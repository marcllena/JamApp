import { TestBed } from '@angular/core/testing';

import { JamService } from './jam.service';

describe('JamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JamService = TestBed.get(JamService);
    expect(service).toBeTruthy();
  });
});
