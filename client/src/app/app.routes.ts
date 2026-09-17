import { Routes } from '@angular/router';

import { ProductsComponent } from './products/products';
import { AddProductComponent } from './add-product/add-product';
import { UpdateProductComponent } from './update-product/update-product';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'update-product/:id',
    component: UpdateProductComponent
  }
];