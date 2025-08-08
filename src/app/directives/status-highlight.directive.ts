import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
  standalone: true,
})
export class StatusHighlightDirective implements OnInit {
  @Input() isActive: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Add background color based on status
    const backgroundColor = this.isActive ? '#dcf5dc' : '#ffdfdf';
    const textColor = this.isActive ? '#008000' : '#ff0000';

    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      backgroundColor
    );
    this.renderer.setStyle(this.el.nativeElement, 'color', textColor);
    this.renderer.setStyle(this.el.nativeElement, 'padding', '4px 8px');
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '4px');
    this.renderer.setStyle(this.el.nativeElement, 'fontWeight', '500');
  }
}
