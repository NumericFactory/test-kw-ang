import { Component, inject } from '@angular/core';
import { ProductStore } from '../data/product.store';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../design-system/ui/tag/tag.component';
import { ButtonComponent } from '../../design-system/ui/button/button.component';
import { ProductCardComponent } from '../ui/product-card/product-card.component';
import { SearchbarComponent } from '../ui/searchbar/searchbar.component';
import { PaginationComponent } from '../../design-system/ui/pagination/pagination.component';
import { PluralizePipe } from '../../shared/pipes/pluralize.pipe';
import { searchValueObject } from '../value-object/search-value-object';
import { LoaderComponent } from '../../design-system/ui/loader/loader.component';


@Component({
  selector: 'app-products-list-view',
  standalone: true,
  imports: [
    CommonModule,
    PluralizePipe,
    TagComponent, ButtonComponent, PaginationComponent, LoaderComponent,
    ProductCardComponent, SearchbarComponent
  ],
  templateUrl: './products-list-view.component.html',
  styleUrl: './products-list-view.component.scss',
  providers: [ProductStore]
})
export class ProductsListViewComponent {

  /**
   * Injecting the ProductStore
   * 
   * (guideline : unidirectional data flow)
   * this component is a smart component.
   * only smart component is authorized to manage state,
   * through the ProductStore (or gateway abstraction)
   */
  readonly store = inject(ProductStore);

  searchProducts(searchValue: searchValueObject) {
    this.store.searchProducts(searchValue);
  }

  pageChanged(page: any) {
    this.store.setPage(page);
  }

  perPageChanged(itemsPerPage: number) {
    this.store.setPerPage(itemsPerPage);
  }

}
