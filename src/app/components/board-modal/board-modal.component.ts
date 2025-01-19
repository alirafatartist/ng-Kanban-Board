import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, viewChild, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBoardData } from '../../interfaces/boardData';
import { ThemeService } from '../../services/theme.service';
import { ActivatedRoute } from '@angular/router';

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
export class BoardModalComponent implements OnChanges, OnInit {
  @Input() isBoardOpen: boolean = false;
  @Input() modalBoardTitle: string = '';
  @Input() board: IBoardData = { name: '', columns: [] };
  @Output() close = new EventEmitter<void>();
  @Output() saveChanges =new EventEmitter<IBoardData>();
@ViewChild('boardnameInput') boardnameInput!: ElementRef;
  boardForm!: FormGroup;
  isDarkMode: boolean =inject(ThemeService).isDarkMode
  constructor(private fb: FormBuilder,
    private themeService: ThemeService
  ) { }
  ngOnInit(): void {
    this.boardForm = this.fb.group({
      boardname: [this.board?.name || '', [Validators.required]],
      columns: this.fb.array([]),
    });

    if (this.board?.columns?.length) {
      this.board.columns.forEach(column => this.addColumn(column.name));
    }
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }
 ngOnChanges(changes: SimpleChanges): void {// focusing on input
  if (changes['isBoardOpen'] && this.isBoardOpen) {
    setTimeout(() => {
      this.boardnameInput.nativeElement.focus();
    }, 0); 
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
      const updatedBoard = this.boardForm.value;
      console.log('Saved Board:', updatedBoard);
      this.saveChanges.emit(updatedBoard);
      this.closeModal();
    } else {
      console.log('Form is invalid');
    }
  }
  addNewColumn() {
    this.columns.push(this.fb.control(''));
  }
  closeColumn(index: number) {
    this.columns.removeAt(index);
  }
  closeModal() {
    this.isBoardOpen = false;
    this.close.emit();
  }
}
