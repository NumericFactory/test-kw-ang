import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-form-field',
  standalone: true,
  imports: [],
  template: `
  <div class="form-group">
    <label>{{textLabel}}</label>
    <ng-content></ng-content>
  </div>
  `
})
export class FormFieldComponent {

  @Input({ required: false }) textLabel!: string;

}
