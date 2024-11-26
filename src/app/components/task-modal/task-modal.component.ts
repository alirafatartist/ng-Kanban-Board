import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBoardData } from '../../interfaces/boardData';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {
  @Input() isTaskOpen: boolean = false;
  @Input() board!: IBoardData;
  @Output() close = new EventEmitter<void>();
  description!: string;
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskTitle: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required, Validators.minLength(5)],
      subtasks: this.fb.array([this.createSubtask()]),
      columns: this.fb.array([]),
      status: ['', Validators.required],
    });
    this.initializeColumns();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['board'] && changes['board'].currentValue) {
      this.initializeColumns();
    }
  }
  initializeColumns(): void {
    this.columns.clear();
    if (this.board?.columns?.length) {
      this.board.columns.forEach((column) => this.addColumn(column.name));
    }
  }
  get columns() {
    return this.taskForm.get('columns') as FormArray;
  }
  addColumn(columnName: string = '') {
    this.columns.push(this.fb.control(columnName, Validators.required))
  }
  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }
  createSubtask(name: string = ''): FormGroup {
    return  this.fb.group({
      name: [name, Validators.required]
    });
  }
  addSubtask() {
    this.subtasks.push(this.createSubtask())
  }
  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }
  Submit() {
    if (this.taskForm.valid) {
      console.log('Form Data:', this.taskForm.value);
      this.closeModal();
    } else {
      console.log('Form Data is invalid');
    }
  }
  closeModal() {
    this.isTaskOpen = false;
    this.close.emit();
  }
}
