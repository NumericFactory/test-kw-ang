import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [],
  template: `
    <button class="btn">{{buttonText}}</button>
  `
})
export class ButtonComponent {

  @Input({ required: true }) buttonText!: string;

}
