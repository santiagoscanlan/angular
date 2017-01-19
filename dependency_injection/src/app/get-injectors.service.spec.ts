/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetInjectorsService } from './get-injectors.service';

describe('Service: GetInjectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetInjectorsService]
    });
  });

  it('should ...', inject([GetInjectorsService], (service: GetInjectorsService) => {
    expect(service).toBeTruthy();
  }));
});
