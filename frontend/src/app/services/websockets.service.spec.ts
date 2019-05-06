import { TestBed } from '@angular/core/testing';

import { WebsocketsService } from './websockets.service';

describe('WebsocketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketsService = TestBed.get(WebsocketsService);
    expect(service).toBeTruthy();
  });
});
