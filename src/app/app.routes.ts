import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'products' },
    {
        path: 'products',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path:'products/:id',
        loadComponent: () => import('./pages/product-detail-page/product-detail-page.component').then(m => m.ProductDetailPageComponent),
    },
    {
        path:'cart',
        loadComponent: () => import('./pages/shopping-cart-page/shopping-cart-page.component').then(m => m.ShoppingCartPageComponent),
    }
];
