import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from './category.model';
import { Product } from './product.model';
import { environment } from '../../../environments/environment';
import { searchValueObject } from '../value-object/search-value-object';

// Type definition of API response (/products)
type ProductsApiResponse = {
  products: Product[],
  total: number,
  skip: number,
  limit: number
};
// Type definition of API response (/products/categories)
type CategoriesApiResponse = Category[];

// Type definition of pagination options
type PaginationOptions = { limit: number, skip: number };
// Type definition of sort options
type SortOptions = Pick<searchValueObject, 'sortBy' | 'order'>;


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private api = environment.apiUrl;


  fetchCategories(): Promise<Category[]> {
    const endpoint = '/products/categories';
    return lastValueFrom(
      this.http.get<CategoriesApiResponse>(`${this.api}${endpoint}`)
    )
  }

  fetchProducts(
    pagination: PaginationOptions,
    sortOptions?: SortOptions): Promise<ProductsApiResponse> {
    let params = new HttpParams()
      .set('limit', pagination.limit)
      .set('skip', pagination.skip);
    if (sortOptions?.sortBy) {
      params = params.append('sortBy', sortOptions.sortBy);
      params = params.append('order', sortOptions.order);
    }
    const endpoint = '/products';
    return lastValueFrom(
      this.http.get<ProductsApiResponse>(`${this.api}${endpoint}`, { params })
    )
  }

  fetchProductsByCategory(
    pagination: PaginationOptions,
    searchValue: searchValueObject): Promise<ProductsApiResponse> {
    const endpoint = `/products/category/${searchValue?.category}`;
    let params = new HttpParams()
      .set('limit', pagination.limit)
      .set('skip', pagination.skip);
    if (searchValue?.sortBy) {
      params = params.append('sortBy', searchValue.sortBy);
      params = params.append('order', searchValue.order);
    }
    return lastValueFrom(
      this.http.get<ProductsApiResponse>(`${this.api}${endpoint}`, { params })
    )
  }


}
