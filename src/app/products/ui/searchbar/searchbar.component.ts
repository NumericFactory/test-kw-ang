import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormFieldComponent } from '../../../design-system/ui/form-field/form-field.component';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../data/category.model';
import { combineLatest, skip, startWith, Subscription, tap } from 'rxjs';
import { searchValueObject } from '../../value-object/search-value-object';

@Component({
  selector: 'searchbar',
  standalone: true,
  imports: [FormFieldComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  @Output() search = new EventEmitter<searchValueObject>();

  categorySelectControl = new FormControl(); // select category
  sortSelectControl = new FormControl();     // select sort by price +- direction

  sub!: Subscription;

  ngOnInit() {

    // Set default value for the category and sort controls
    this.categorySelectControl.setValue('');
    this.sortSelectControl.setValue('');

    // combine category and sort controls into a single observable
    const filterData$ = combineLatest([
      this.categorySelectControl.valueChanges.pipe(startWith('')),
      this.sortSelectControl.valueChanges.pipe(startWith(''))
    ]);

    // subscribe to the filterData$ observable and emit value
    this.sub = filterData$
      .pipe(skip(1),
        tap(([category, sortByPriceDirection]: [string, 'asc' | 'desc']) => {
          const searchValue: searchValueObject = {
            category,
            sortBy: sortByPriceDirection.length > 0 ? 'price' : '',
            order: sortByPriceDirection
          }
          this.search.emit(searchValue);
        }))
      .subscribe();

  } // end of ngOnInit


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
