import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';

describe('FolderService', () => {
  let service: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
