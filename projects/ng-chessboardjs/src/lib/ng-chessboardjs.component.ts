import { Component, Input, Output, OnInit, HostListener, EventEmitter } from '@angular/core';
import * as ChessBoard from 'chessboardjs/www/js/chessboard';

@Component({
  selector: 'ng-chessboardjs',
  template: `
    <div id="chessboardjs" style="width:500px"></div>
  `,
  styles: []
})
export class NgChessboardjsComponent implements OnInit {

  constructor() {}

  @Input()
  set position(value: any) {
    this.mPosition = value;
    if (this.board) { this.board.position(value, this.animation); }
  }

  get position(): any     { return this.mPosition;      }

  @Input()
  set orientation(value: boolean) {
    this.mOrientation = value;
    if (this.board) { this.board.orientation(value ? 'white' : 'black'); }
    this.orientationChange.emit(this.mOrientation);
  }

  get orientation(): boolean { return this.mOrientation;   }

  @Input()
  set showNotation(value: boolean) {
    this.mShowNotation = value;
    if (this.board) { this.load(); }
    this.showNotationChange.emit(this.mShowNotation);
  }

  get showNotation(): boolean { return this.mShowNotation;  }

  @Input()
  set draggable(value: boolean) {
    this.mDraggable = value;
    if (this.board) { this.load(); }
    this.draggableChange.emit(this.mDraggable);
  }

  get draggable(): boolean { return this.mDraggable;     }

  @Input()
  set dropOffBoard(value: string) {
    this.mDropOffBoard = value;
    if (this.board) { this.load(); }
    this.dropOffBoardChange.emit(this.mDropOffBoard);
  }

  get dropOffBoard(): string  { return this.mDropOffBoard;  }

  @Input()
  set pieceTheme(value: any) {
    this.mPieceTheme = value instanceof Function ? value() : value;
    if (this.board) { this.load(); }
    this.pieceThemeChange.emit(this.mPieceTheme);
  }

  get pieceTheme(): any     { return this.mPieceTheme;    }

  @Input()
  set moveSpeed(value: any) {
    this.mMoveSpeed = value;
    if (this.board) { this.load(); }
    this.moveSpeedChange.emit(this.mMoveSpeed);
  }

  get moveSpeed(): any     { return this.mMoveSpeed;     }

  @Input()
  set snapbackSpeed(value: any) {
    this.mSnapbackSpeed = value;
    if (this.board) { this.load(); }
    this.snapbackSpeedChange.emit(this.mSnapbackSpeed);
  }

  get snapbackSpeed(): any     { return this.mSnapbackSpeed; }

  @Input()
  set snapSpeed(value: any) {
    this.mSnapSpeed = value;
    if (this.board) { this.load(); }
    this.snapSpeedChange.emit(this.mSnapSpeed);
  }

  get snapSpeed(): any     { return this.mSnapSpeed;     }

  @Input()
  set sparePieces(value: boolean) {
    this.mSparePieces = value;
    if (this.board) { this.load(); }
    this.sparePiecesChange.emit(this.mSparePieces);
  }

  get sparePieces(): boolean { return this.mSparePieces;   }

  board: any;

  private mPosition: any     = 'start';
  private mOrientation = true;
  private mShowNotation = true;
  private mDraggable = false;
  private mDropOffBoard  = 'snapback';
  private mPieceTheme: any     = 'img/chesspieces/wikipedia/{piece}.png';
  private mMoveSpeed: any     = 200;
  private mSnapbackSpeed: any     = 500;
  private mSnapSpeed: any     = 100;
  private mSparePieces = false;

  @Input() animation = true;
  @Output() animationChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() positionChange: EventEmitter<any>     = new EventEmitter<any>();
  @Output() orientationChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showNotationChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() draggableChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() dropOffBoardChange: EventEmitter<string>  = new EventEmitter<string>();
  @Output() pieceThemeChange: EventEmitter<any>     = new EventEmitter<any>();
  @Output() moveSpeedChange: EventEmitter<any>     = new EventEmitter<any>();
  @Output() snapbackSpeedChange: EventEmitter<any>     = new EventEmitter<any>();
  @Output() snapSpeedChange: EventEmitter<any>     = new EventEmitter<any>();
  @Output() sparePiecesChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // EVENTS

  @Output() changed: EventEmitter<object> = new EventEmitter<object>();
  @Output() dragStart: EventEmitter<object> = new EventEmitter<object>();
  @Output() dragMove: EventEmitter<object> = new EventEmitter<object>();
  @Output() dropped: EventEmitter<object> = new EventEmitter<object>();
  @Output() snapbackEnd: EventEmitter<object> = new EventEmitter<object>();
  @Output() moveEnd: EventEmitter<object> = new EventEmitter<object>();

  // PARAMETERS

  @HostListener('window:resize', ['$event'])
  onResize(event): void{
    if (this.board) { this.board.resize(event); }
  }

  // METHODS

  public clear(): void {
    this.board.clear(this.animation);
  }

  public move(notation: string): void {
    this.board.move(notation);
  }

  private onChangeHandler(oldPos: any, newPos: any): void {
    this.changed.emit({oldPos, newPos});
  }

  private onDragStart(source: string, piece: string, position: any, orientation: string): void {
    this.dragStart.emit({source, piece, position, orientation});
  }

  private onDragMove(newLocation: any, oldLocation: any, source: string, piece: string, position: any, orientation: string): void {
    this.dragMove.emit({newLocation, oldLocation, source, piece, position, orientation});
  }

  private onDrop(source: string, target: string, piece: string, newPos: any, oldPos: any, orientation: string): void {
    this.mPosition = newPos;
    this.positionChange.emit(this.mPosition);
    this.dropped.emit({source, target, piece, newPos, oldPos, orientation});
  }

  private onSnapbackEnd(piece: string, square: string, position: any, orientation: string): void {
    this.snapbackEnd.emit({piece, square, position, orientation});
  }

  private onMoveEnd(oldPos: any, newPos: any): void {
    this.mPosition = newPos;
    this.positionChange.emit(this.mPosition);
    this.moveEnd.emit({oldPos, newPos});
  }

  private load(): void {
    this.board = ChessBoard('chessboardjs', {
      position: this.mPosition,
      orientation: this.mOrientation ? 'white' : 'black',
      showNotation: this.mShowNotation,
      draggable: this.mDraggable,
      dropOffBoard: this.mDropOffBoard,
      pieceTheme: this.mPieceTheme,
      moveSpeed: this.mMoveSpeed,
      snapbackSpeed: this.mSnapbackSpeed,
      snapSpeed: this.mSnapSpeed,
      sparePieces: this.mSparePieces,

      onDragStart: this.onDragStart.bind(this),
      onChange: this.onChangeHandler.bind(this),
      onDragMove: this.onDragMove.bind(this),
      onDrop: this.onDrop.bind(this),
      onSnapbackEnd: this.onSnapbackEnd.bind(this),
      onMoveEnd: this.onMoveEnd.bind(this)
    });
  }

  ngOnInit(): void {
    this.load();
  }

}
