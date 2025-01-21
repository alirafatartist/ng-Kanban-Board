import { ITask } from './../../interfaces/boardData';
import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBoardData } from '../../interfaces/boardData';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  CommonModule
  ],
  templateUrl: './board-modal.component.html',
  styleUrl: './board-modal.component.scss'
})
export class BoardModalComponent  {
  @Input() isBoardOpen: boolean = false;
  @Input() modalBoardTitle: string = '';
  @Input() board: IBoardData | ITask | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<IBoardData | ITask>();
  @ViewChild('boardnameInput') boardnameInput!: ElementRef;
  boardForm!: FormGroup;
  isDarkMode: boolean =inject(ThemeService).isDarkMode;
  isBoard:boolean=false;
  private themeSubscription!: Subscription;
  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService
  ) { }
  private isBoardData(board: IBoardData | ITask): board is IBoardData {
    this.isBoard='name' in board;
    return 'name' in board;
  }
  ngOnInit(): void {
    this.boardForm = this.fb.group({
      boardname: ['', Validators.required],
      columns: this.fb.array([]),
      title: ['', Validators.required],
      subtasks: this.fb.array([])
    });

    if (!this.board) return;

    if (this.isBoardData(this.board)) {
      this.boardForm.patchValue({ boardname: this.board.name });
      this.board.columns.forEach(col =>
        this.columns.push(this.fb.control(col.name, Validators.required))
      );
    } else {
      this.boardForm.patchValue({ title: this.board.title });
      this.board.subtasks.forEach(sub =>
        this.subtasks.push(this.fb.control(sub.title, Validators.required))
      );
    }
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }
  ngOnChanges(): void {
    if (this.isBoardOpen && this.boardnameInput) {
      setTimeout(() => {
        this.boardnameInput.nativeElement.focus();
      }, 0);
    }
  }

  // ngOnDestroy(): void {
  //   if (this.themeSubscription) {
  //     this.themeSubscription.unsubscribe();
  //   }
  // }
  get columns() {
    return (this.boardForm?.get('columns') as FormArray) || this.fb.array([]);
  }

  get subtasks() {
    return (this.boardForm?.get('subtasks') as FormArray) || this.fb.array([]);
  }

  addColumn(columnName: string = '') {
    this.columns.push(this.fb.control(columnName, Validators.required));
  }
  addSubtask(subtaskTitle: string = '') {
    this.subtasks.push(this.fb.control(subtaskTitle, Validators.required));
  }

  get formControl() {
    return this.boardForm.controls;
  }

  submit() {
    if (this.boardForm.valid) {
      console.log('Form Data:', this.boardForm.value);
      const updatedBoard = this.boardForm.value;
      console.log('Saved Board:', updatedBoard);
      this.saveChanges.emit(this.boardForm.value);
      this.closeModal();
    } else {
      console.log('Form is invalid');
    }
  }
  addNewColumn() {
    this.columns.push(this.fb.control(''));
  }
  addNewSubTask(){
    this.subtasks.push(this.fb.control(''));
  }
  closeColumn(index: number) {
    this.columns.removeAt(index);
  }
  closeSubTask(index:number){
    this.subtasks.removeAt(index);

  }
  closeModal() {
    this.isBoardOpen = false;
    this.close.emit();
  }
}
