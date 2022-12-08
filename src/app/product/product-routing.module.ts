import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from '../product/product.component';
 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
const routes: Routes = [
    { path: '', component: ProductComponent },
    { path: 'product-detail/:id', component: ProductDetailComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  providers:[],
})
export class ProductRoutingModule { } 