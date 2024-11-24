import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBoardData } from '../../interfaces/boardData';

@Component({
  selector: 'app-board-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './board-modal.component.html',
  styleUrl: './board-modal.component.scss'
})
export class BoardModalComponent {
  @Input() isBoardOpen: boolean = false;
  @Input() modalBoardTitle: string = '';
  @Input() board!:IBoardData;
  @Output() close = new EventEmitter<void>();

  boardForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.boardForm = this.fb.group({
      boardname: [this.board?.name || '', [Validators.required]],
      columns: this.fb.array([]),
    });

    if (this.board?.columns?.length) {
      this.board.columns.forEach(column => this.addColumn(column.name));
    }
  }
  get columns() {
    return this.boardForm.get('columns') as FormArray;// to push in it
  }

  addColumn(columnName: string = '') {
    this.columns.push(this.fb.control(columnName, Validators.required));
  }

  get formControl() {
    return this.boardForm.controls;
  }

  submit() {
    if (this.boardForm.valid) {
      console.log('Form Data:', this.boardForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
  addNewColumn(){
    this.columns.push(this.fb.control(''));
  }
  closeColumn(index: number) {
      this.columns.removeAt(index);
  }
  closeModal(){
    this.isBoardOpen = false;
    this.close.emit();
  }
}
