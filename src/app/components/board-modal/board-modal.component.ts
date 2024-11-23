import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
  @Output() close = new EventEmitter<void>();

  boardForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize form inside ngOnInit
    this.boardForm = this.fb.group({
      boardname: ['', [Validators.required]]
    });
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

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }
}
