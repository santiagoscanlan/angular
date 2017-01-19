/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockMyService } from './mock-my.service';

describe('Service: MockMy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockMyService]
    });
  });

  it('should ...', inject([MockMyService], (service: MockMyService) => {
    expect(service).toBeTruthy();
  }));
});
