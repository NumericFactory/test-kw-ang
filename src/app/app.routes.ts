import { Routes } from '@angular/router';
import { ProductsListViewComponent } from './products/products-list-view/products-list-view.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductsListViewComponent },
    // {
    //     'path': 'products',
    //     'loadChildren': () => import('./products/products.module').then(m => m.ProductsModule)
    // },
];
