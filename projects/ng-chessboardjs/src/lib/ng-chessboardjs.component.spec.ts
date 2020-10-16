import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgChessboardjsComponent } from './ng-chessboardjs.component';

describe('NgChessboardjsComponent', () => {
  let component: NgChessboardjsComponent;
  let fixture: ComponentFixture<NgChessboardjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgChessboardjsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgChessboardjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
