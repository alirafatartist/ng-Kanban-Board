import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() isOpen: boolean = false;
  @Input() modalTitle: string = '';
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
  closeModal(index: number) {
    // this.isOpen = false;
    // this.close.emit();
      this.columns.removeAt(index);
  }
}
