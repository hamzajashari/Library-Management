import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubscriptionService = TestBed.get(SubscriptionService);
    expect(service).toBeTruthy();
  });
});
