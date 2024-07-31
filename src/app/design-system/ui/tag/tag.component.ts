import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" 
          [ngClass]="{
          'badge-success': tagColor==='success', 
          'badge-warning': tagColor==='warning', 
          'badge-danger':  tagColor==='danger'}">
        {{ tagText}}
    </span>
  `,
  styleUrl: './tag.component.scss',
})
export class TagComponent {

  @Input({ required: true }) tagText!: string;
  @Input() tagColor: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' = 'info';

}
