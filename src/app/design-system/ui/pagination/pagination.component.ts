import { Component, EventEmitter, Input, Output } from '@angular/core';
import { debounce, debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() currentPage!: number;
  @Input() total!: number;
  @Output() pageChanged = new EventEmitter();
  @Output() perPageChanged = new EventEmitter()

  click$: Subject<number> = new Subject();

  nextPage() {
    this.currentPage++;
    this.click$.next(this.currentPage);
  }

  previousPage() {
    this.currentPage--;
    this.click$.next(this.currentPage);
  }

  setPerPage(itemsPerPage: string) {
    this.perPageChanged.emit(Number(itemsPerPage));
  }

  ngOnInit() {
    this.click$.pipe(debounceTime(500))
      .subscribe(event => {
        this.pageChanged.emit(event);
      });
  }

}
