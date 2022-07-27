import { TestBed } from '@angular/core/testing';

import { UsernameTakenValidatorService } from './username-taken-validator.service';

describe('UsernameTakenValidatorService', () => {
  let service: UsernameTakenValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernameTakenValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
