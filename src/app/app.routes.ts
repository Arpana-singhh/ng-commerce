import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { ProductListComponent } from './features/products/pages/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/pages/product-detail/product-detail.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AddProductComponent } from './features/products/pages/add-product/add-product.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'product-list', pathMatch: 'full' },
      { path: 'product-list', component: ProductListComponent },
      { path: 'product/add', component: AddProductComponent },
      { path: 'product/:id', component: ProductDetailComponent }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '**', redirectTo: 'product-list' }
];