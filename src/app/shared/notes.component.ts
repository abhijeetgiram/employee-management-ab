import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-notes',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card mt-3">
      <div class="card-header">Notes for {{ employeeName }}</div>
      <div class="card-body">
        <textarea
          [(ngModel)]="note"
          class="form-control"
          rows="4"
          placeholder="Write your note here..."
        ></textarea>
        <button class="btn btn-primary mt-2" (click)="saveNote()">Save</button>
        <button class="btn btn-secondary mt-2 ms-3" (click)="cancel()">
          Cancel
        </button>
      </div>
    </div>
  `,
})
export class NotesComponent {
  @Input() employeeName = '';
  @Output() noteSaved = new EventEmitter<string>();
  note = '';
  private toastService = inject(ToastService);

  saveNote() {
    this.toastService.show(`Note saved for ${this.employeeName}`);
    this.noteSaved.emit(this.note); // emit to parent
    this.note = ''; // Clear the note after saving
  }

  cancel() {
    this.note = ''; // Clear the note
    this.noteSaved.emit(''); // Emit empty string to indicate cancellation
  }
}
