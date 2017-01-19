/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SayMyNameService } from './say-my-name.service';

describe('Service: SayMyName', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SayMyNameService]
    });
  });

  it('should ...', inject([SayMyNameService], (service: SayMyNameService) => {
    expect(service).toBeTruthy();
  }));
});
