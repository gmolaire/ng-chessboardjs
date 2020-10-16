import { TestBed } from '@angular/core/testing';

import { NgChessboardjsService } from './ng-chessboardjs.service';

describe('NgChessboardjsService', () => {
  let service: NgChessboardjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgChessboardjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
