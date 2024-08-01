import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    {
        path: 'products',
        loadComponent: () => import('./products/products-list-view/products-list-view.component')
            .then(m => m.ProductsListViewComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./shared/components/not-found/not-found.component')
            .then(m => m.NotFoundComponent)
    }
];
