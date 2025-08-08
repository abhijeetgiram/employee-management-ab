import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

declare const bootstrap: any; // Bootstrap JS API

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="toast-container position-fixed top-0 end-0 p-3"
      style="z-index: 2000"
    >
      <div
        #toastEl
        class="toast align-items-center border-0"
        [ngClass]="bgClass"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">
            {{ message }}
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  `,
})
export class ToastComponent {
  message = '';
  bgClass = 'text-bg-info';

  constructor(private toastService: ToastService) {
    effect(() => {
      const toastData = this.toastService.toastMessage();
      if (toastData) {
        this.message = toastData.text;
        this.bgClass = `text-bg-${toastData.type}`;
        setTimeout(() => this.showToast(), 0);
      }
    });
  }

  private showToast() {
    const toastEl = document.querySelector('.toast') as HTMLElement;
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }
}
