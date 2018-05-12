import { TestBed, inject } from '@angular/core/testing';

import { NavigationInfoService } from './navigation-info.service';

describe('NavigationInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationInfoService]
    });
  });

  it('should be created', inject([NavigationInfoService], (service: NavigationInfoService) => {
    expect(service).toBeTruthy();
  }));
});
