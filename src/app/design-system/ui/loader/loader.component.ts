import { Component } from '@angular/core';

@Component({
  selector: 'ui-loader',
  standalone: true,
  imports: [],
  template: `
   <div class="progress-bar">
    <div class="progress-bar-value"></div>
  </div>
  `,
  styles: `
  .progress-bar {
  height: 4px;
  background-color: rgba(5, 114, 206, 0.2);
  width: 100%;
  overflow: hidden;
}

.progress-bar-value {
  width: 100%;
  height: 100%;
  background-color: var(--primary);
  animation: indeterminateAnimation 1s infinite linear;
  transform-origin: 0% 50%;
}

@keyframes indeterminateAnimation {
  0% {
    transform:  translateX(0) scaleX(0);
  }
  40% {
    transform:  translateX(0) scaleX(0.4);
  }
  100% {
    transform:  translateX(100%) scaleX(0.5);
  }
}
  `
})
export class LoaderComponent {

}
