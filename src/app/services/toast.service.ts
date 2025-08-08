import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  text: string;
  type: 'success' | 'danger' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toastMessage = signal<ToastMessage | null>(null);

  show(text: string, type: ToastMessage['type'] = 'info') {
    this.toastMessage.set({ text, type });
  }
}
