import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [CommonModule],
  template: `
    <div class="card shadow-sm mb-3">
      <div class="card-header bg-primary text-white">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content select="[card-body]"></ng-content>
      </div>
      <div class="card-footer text-muted">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
})
export class CardComponent {}
