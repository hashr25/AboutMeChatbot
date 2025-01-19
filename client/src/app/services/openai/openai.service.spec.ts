import { TestBed } from '@angular/core/testing';

import { OpenAIService } from '../openai/openai.service';

describe('OpenaiService', () => {
  let service: OpenAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
